import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { compareFaces } from '../../store/actions/index';
import { connect } from 'react-redux';

class PickImage extends Component {
	state = {
		cardPhoto: null
	};

	pickImageHandler = () => {
		ImagePicker.showImagePicker({ title: 'Pick an Image' }, (res) => {
			if (res.didCancel) {
				console.log('User cancelled');
			} else if (res.error) {
				console.log('Error', res.error);
			} else {
				this.setState({
					cardPhoto: {
						uri: res.uri,
						type: res.type,
						name: res.fileName
					}
				});
			}
		});
	};

	compareImageHandler = () => {
		ImagePicker.launchCamera({ title: 'Take a selfie' }, (response) => {
			if (response.didCancel) {
				console.log('User cancelled');
			} else if (response.error) {
				console.log('Error', response.error);
			} else {
				cardPhoto = this.state.cardPhoto.base64;
				original = {
					uri: response.uri,
					type: response.type,
					name: response.fileName
				};
				// console.log(this.state.cardPhoto.uri);
				this.props.onCompareFaces(this.state.cardPhoto, original);
			}
		});
	};

	render() {
		let button = null;
		if (!this.props.cardPhoto) {
		} else {
		}
		console.log(this.state.cardPhoto);
		return (
			<View style={styles.container}>
				<View style={styles.placeHolder}>
					<Image source={this.state.cardPhoto} style={styles.previewImage} />
				</View>
				<View style={styles.button}>
					{this.state.cardPhoto ? (
						(button = <Button title="Verify your face" onPress={this.compareImageHandler} />)
					) : (
						(button = <Button title={this.props.title} onPress={this.pickImageHandler} />)
					)}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center'
	},
	placeHolder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150
	},
	button: {
		margin: 8
	},
	previewImage: {
		width: '100%',
		height: '100%'
	}
});

export default PickImage;
