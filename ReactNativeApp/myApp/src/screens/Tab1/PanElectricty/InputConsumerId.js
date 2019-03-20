import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { verifyElectricityBill } from '../../../store/actions/index';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import StartButton from '../../../components/UI/NewButton/StartButton';
import ActivityIndicatorScreen from '../../../components/UI/ActivityIndicatorScreen/ActivityIndicatorScreen';
import Toast from 'react-native-root-toast';

class InputConsumerId extends Component {
	state = {
		consumerId: ''
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

	render() {
		return (
			<View style={styles.container}>
				{this.props.isScreenLoading ? <ActivityIndicatorScreen loading={this.props.isScreenLoading} /> : null}
				<DefaultInput
					placeholder="Enter consumer Id of your Electric Bill"
					value={this.state.consumerId}
					onChangeText={(text) =>
						this.setState({
							consumerId: text
						})}
					style={{ backgroundColor: '#fff' }}
				/>
				<StartButton
					title="Next"
					pressFunction={() => {
						this.props
							.onVerifyElectricityBill(this.state.consumerId, this.props.panNumber)
							.then((result) => {
								if (result.success) {
									Toast.show('KYC completed', {
										duration: Toast.durations.SHORT,
										position: Toast.positions.BOTTOM,
										shadow: true,
										animation: true,
										ToashideOnPress: true,
										delay: 0
									});
									Navigation.popToRoot(this.props.componentId);
								} else if (result.error) {
									Toast.show('Cosumer ID does not exist', {
										duration: Toast.durations.SHORT,
										position: Toast.positions.BOTTOM,
										shadow: true,
										animation: true,
										ToashideOnPress: true,
										delay: 0
									});
								}
							});
					}}
					disabled={this.state.consumerId.length == 7 ? false : true}
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

const mapDispatchToProps = (dispatch) => {
	return {
		onVerifyElectricityBill: (consumerId, panNumber) => dispatch(verifyElectricityBill(consumerId, panNumber))
	};
};

const mapStateToProps = (state) => {
	return {
		isScreenLoading: state.ui.screenLoading
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputConsumerId);
