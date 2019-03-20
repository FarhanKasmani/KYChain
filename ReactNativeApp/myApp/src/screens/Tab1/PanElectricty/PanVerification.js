import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { faceVerify } from '../../../store/actions/index';
import ImagePicker from 'react-native-image-picker';
import StartButton from '../../../components/UI/NewButton/StartButton';
import ActivityIndicatorScreen from '../../../components/UI/ActivityIndicatorScreen/ActivityIndicatorScreen';

class PanVerification extends Component {
	state = {
		toggle: true
	};

	faceVerifierHandler = () => {
		ImagePicker.launchCamera({ title: 'Take a selfie' }, (response) => {
			if (response.didCancel) {
				console.log('User cancelled');
			} else if (response.error) {
				console.log('Error', response.error);
			} else {
				original = {
					uri: response.uri,
					type: response.type,
					name: response.fileName
				};
				this.props.onFaceVerifyPan(original, this.props.panNumber);
				this.setState({
					...this.state,
					toggle: !this.state.toggle
				});
			}
		});
	};

	pushToElectriciyBill = () => {
		Navigation.push(this.props.componentId, {
			component: {
				name: 'PanElectricity.InputConsumerId',
				passProps: {
					panNumber: this.props.panNumber
				}
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				{this.props.isScreenLoading ? <ActivityIndicatorScreen loading={this.props.isScreenLoading} /> : null}
				{this.props.panStatus ? (
					<StartButton title="Next" pressFunction={this.pushToElectriciyBill} />
				) : (
					<StartButton title="Face Verify" pressFunction={this.faceVerifierHandler} />
				)}
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

const mapDispatchToProps = (dispatch) => {
	return {
		onFaceVerifyPan: (original, aadharNumber) => dispatch(faceVerify(original, aadharNumber, 'pan'))
	};
};

const mapStateToProps = (state) => {
	return {
		panStatus: state.kyc.panStatus,
		isScreenLoading: state.ui.screenLoading
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PanVerification);
