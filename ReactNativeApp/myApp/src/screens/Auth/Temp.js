import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Pincode from 'react-native-code-verification';

export default class OTPVerifcation extends Component {
	state = {
		timer: 60
	};

	onDetectPin = (pin) => {
		console.log(typeof pin);
		alert(pin);
	};

	onCloseView = () => {
		alert('closed');
	};

	render() {
		return (
			<View style={styles.container}>
				<Pincode
					descriptionText="Please enter the OTP sent on your registered Contact"
					onEnteredPincode={(pin) => this.onDetectPin(pin)}
					onCloseView={this.onCloseView}
					onPressTouchId={() => console.log('TouchID')}
				/>
			</View>
		);
	}
}

styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#fff'
	}
});
