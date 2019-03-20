import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Pincode from 'react-native-code-verification';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { otpVerifyAadhar } from '../../store/actions/index';
import ActivityIndicatorScreen from '../../components/UI/ActivityIndicatorScreen/ActivityIndicatorScreen';

class OTP extends Component {
	state = {
		timer: 60
	};

	onDetectPin = (pin) => {
		clearInterval(this.interval);
		if (this.props.otp == pin) {
			this.props.onOtpVerifyAadhar(this.props.aadharNumber).then((resp) => {
				Navigation.popToRoot(this.props.componentId);
				Toast.show(resp, {
					duration: Toast.durations.SHORT,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
					hideOnPress: true,
					delay: 0
				});
			});
		} else {
			alert('Wrong OTP');
			Navigation.popToRoot(this.props.componentId);
		}
	};

	onCloseView = () => {
		Navigation.pop(this.props.componentId);
	};

	componentDidMount() {
		// this.interval = setInterval(() => this.setState((prevState) => ({ timer: prevState.timer - 1 })), 1000);
	}

	componentDidUpdate() {
		if (this.state.timer === 1) {
			clearInterval(this.interval);
			alert('Time out');
			Navigation.popToRoot(this.props.componentId);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.isScreenLoading ? <ActivityIndicatorScreen loading={this.props.isScreenLoading} /> : null}
				<Text>{this.props.otp}</Text>
				<Pincode
					descriptionText="Please enter the OTP sent on your registered Contact"
					onEnteredPincode={(pin) => this.onDetectPin(pin)}
					onCloseView={this.onCloseView}
					onPressTouchId={() => console.log(this.props.otp)}
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
const mapDispatchToProps = (dispatch) => {
	return {
		onOtpVerifyAadhar: (aadharNumber) => dispatch(otpVerifyAadhar(aadharNumber))
	};
};

const mapStateToProps = (state) => {
	return {
		isScreenLoading: state.ui.screenLoading
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
