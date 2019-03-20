import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import StartButton from '../../../components/UI/NewButton/StartButton';
import { domainName } from '../../../store/actions/index';
import Toast from 'react-native-root-toast';

class InputAadhar extends Component {
	state = {
		aadharNumber: ''
	};

	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
	}

	componentWillUnmount() {
		// Not mandatory
		if (this.navigationEventListener) {
			this.navigationEventListener.remove();
		}
	}

	aadharCheck(aadharNumber) {
		fetch('http://' + domainName + '/api/rekognition/aadhar/', {
			method: 'POST',
			body: JSON.stringify({
				aadharNumber: aadharNumber
			}),
			headers: {
				Authorization: 'JWT ' + authToken,
				'Content-Type': 'application/json'
			}
		})
			.catch((err) => {
				console.log(err);
				alert('Something went wrong, please try again!');
			})
			.then((res) => res.json())
			.then((parsedRes) => {
				if (parsedRes.data) {
					Navigation.push(this.props.componentId, {
						component: {
							name: 'Aadhar.Verification',
							passProps: {
								aadharNumber: this.state.aadharNumber
							}
						}
					});
				} else {
					Toast.show('Aadhar number does not exist', {
						duration: Toast.durations.SHORT,
						position: Toast.positions.BOTTOM,
						shadow: true,
						animation: true,
						ToashideOnPress: true,
						delay: 0
					});
					this.setState({
						...this.state,
						aadharNumber: ''
					});
				}
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<DefaultInput
					placeholder="Enter your Aadhar Number"
					value={this.state.aadharNumber}
					onChangeText={(text) =>
						this.setState({
							aadharNumber: text
						})}
					style={{ backgroundColor: '#fff' }}
				/>
				<StartButton
					title="Next"
					pressFunction={() => {
						this.aadharCheck(this.state.aadharNumber);
					}}
					disabled={this.state.aadharNumber.length == 12 ? false : true}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20
	}
});

// const mapDispatchToProps = () => {
// 	return {
// 		onAadharGet: (aadharNumber) => dispatch(checkAadhar(aadharNumber))
// 	};
// };

// export default connect(null, mapDispatchToProps)(InputAadhar);
export default InputAadhar;
