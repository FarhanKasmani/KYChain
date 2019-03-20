import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { faceVerify, screenStartLoading } from '../../../store/actions/index';
import ImagePicker from 'react-native-image-picker';
import StartButton from '../../../components/UI/NewButton/StartButton';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import ActivityIndicatorScreen from '../../../components/UI/ActivityIndicatorScreen/ActivityIndicatorScreen';

import { otpSend } from '../../../store/actions/aadhar';
class Verification extends Component {
	state = {
		toggle: false,
		face: true
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
				console.log('Inside face verify');
				console.log(original);
				this.props.onFaceVerifyAadhar(original, this.props.aadharNumber);
				this.setState({
					face: false
				});
				// Toast.show('face', {
				// 	duration: Toast.durations.SHORT,
				// 	position: Toast.positions.BOTTOM,
				// 	shadow: true,
				// 	animation: true,
				// 	hideOnPress: true,
				// 	delay: 0
				// });
				// Navigation.pop(this.props.componentId);
			}
		});
	};

	showOTPModel = () => {
		let otp = Math.floor(1000 + Math.random() * 9000);
		this.props.onOtpSend(otp.toString(), this.props.aadharNumber);
		Navigation.push(this.props.componentId, {
			component: {
				name: 'OTP',
				passProps: {
					otp: otp,
					aadharNumber: this.props.aadharNumber
				}
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				{this.props.isScreenLoading ? <ActivityIndicatorScreen loading={this.props.isScreenLoading} /> : null}
				{this.state.face ? (
					<StartButton title="Verify with Face Recognition" pressFunction={this.faceVerifierHandler} />
				) : (
					<StartButton title="Verify with OTP" pressFunction={this.showOTPModel} />
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
		onOtpSend: (otp, aadharNumber) => dispatch(otpSend(otp, aadharNumber)),
		onFaceVerifyAadhar: (original, aadharNumber) => dispatch(faceVerify(original, aadharNumber, 'aadhar'))
	};
};

const mapStateToProps = (state) => {
	return {
		isScreenLoading: state.ui.screenLoading
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
