import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { otpVerifyAadhar } from '../../store/actions/index';

class OTP extends Component {
	state = {
		text: '',
		timer: 60
	};

	otpVerifyHandler = () => {
		clearInterval(this.interval);
		if (this.props.otp == this.state.text) {
			this.props.onOtpVerifyAadhar(this.props.aadharNumber);
		} else {
			alert('Wrong OTP');
		}
		Navigation.popToRoot(this.props.componentId);
	};

	componentDidMount() {
		this.interval = setInterval(() => this.setState((prevState) => ({ timer: prevState.timer - 1 })), 1000);
	}

	componentDidUpdate() {
		if (this.state.timer === 1) {
			clearInterval(this.interval);
			alert('Time out');
		}
	}

	render() {
		return (
			<View>
				<Text>Enter you OTP</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(text) => this.setState({ text: text })}
					value={this.state.text}
					maxLength={6}
				/>
				<Button title="Enter" onPress={this.otpVerifyHandler} />
				<Text> {this.state.timer} secs left </Text>
				<Text>{this.props.otp}</Text>
			</View>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onOtpVerifyAadhar: (aadharNumber) => dispatch(otpVerifyAadhar(aadharNumber))
	};
};

export default connect(null, mapDispatchToProps)(OTP);
