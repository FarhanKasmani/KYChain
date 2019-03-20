import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { panStatus } from '../../../store/actions';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import StartButton from '../../../components/UI/NewButton/StartButton';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import { domainName } from '../../../store/actions/index';
import Toast from 'react-native-root-toast';

class InputPan extends Component {
	state = {
		panNumber: ''
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

	panCheck(panNumber) {
		fetch('http://' + domainName + '/api/electricity/get/', {
			method: 'POST',
			body: JSON.stringify({
				panNumber: panNumber
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
				if (parsedRes.success) {
					this.props.unsetPanStatus();
					Navigation.push(this.props.componentId, {
						component: {
							name: 'PanElectricity.PanVerification',
							passProps: {
								panNumber: this.state.panNumber
							}
						}
					});
				} else {
					Toast.show('Pan number does not exist', {
						duration: Toast.durations.SHORT,
						position: Toast.positions.BOTTOM,
						shadow: true,
						animation: true,
						ToashideOnPress: true,
						delay: 0
					});
					this.setState({
						...this.state,
						panNumber: ''
					});
				}
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<DefaultInput
					placeholder="Enter your Pan Number"
					value={this.state.panNumber}
					onChangeText={(text) =>
						this.setState({
							panNumber: text
						})}
					style={{ backgroundColor: '#fff' }}
				/>
				<StartButton
					title="Next"
					pressFunction={() => {
						this.panCheck(this.state.panNumber);
					}}
					disabled={this.state.panNumber.length == 10 ? false : true}
				/>
				<HeadingText>OR</HeadingText>
				<StartButton
					title="Scan QR code of your Pan Card"
					pressFunction={() => {
						Navigation.push(this.props.componentId, {
							component: {
								name: 'PanElectricity.QRCode'
							}
						});
					}}
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
		unsetPanStatus: () => dispatch(panStatus(null))
	};
};

export default connect(null, mapDispatchToProps)(InputPan);
