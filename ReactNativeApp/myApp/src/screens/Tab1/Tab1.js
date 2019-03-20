import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { checkKYC } from '../../store/actions/index';
import ActivityIndicatorScreen from '../../components/UI/ActivityIndicatorScreen/ActivityIndicatorScreen';
import AlertScreen from '../../components/AlertScreen/AlertScreen';

class Tab1 extends Component {
	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
	}

	componentWillUnmount() {
		// Not mandatory
		if (this.navigationEventListener) {
			this.navigationEventListener.remove();
		}
	}

	componentWillMount() {}

	navigationButtonPressed({ buttonId }) {
		if (buttonId === 'sideDrawerToggle') {
			Navigation.mergeOptions(this.props.componentId, {
				sideMenu: {
					left: {
						visible: true
					}
				}
			});
		}
	}

	componentDidDisappear() {
		Navigation.mergeOptions(this.props.componentId, {
			sideMenu: {
				left: {
					visible: false
				}
			}
		});
	}

	render() {
		let content = null;
		if (this.props.onStatus) {
			content = (
				<View style={styles.new}>
					<AlertScreen text="KYC completed sucessfully" type="checkmark" uid={this.props.onStatus} />
				</View>
			);
		} else {
			content = (
				<View>
					<TouchableOpacity
						style={styles.listItem}
						onPress={() => {
							Navigation.push(this.props.componentId, {
								component: {
									name: 'Aadhar.InputAadhar'
								}
							});
						}}
					>
						<View style={styles.listItem}>
							<Text style={styles.textstyle}>Aadhar</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.listItem}
						onPress={() => {
							Navigation.push(this.props.componentId, {
								component: {
									name: 'PanElectricity.InputPan'
								}
							});
						}}
					>
						<View style={styles.listItem}>
							<Text style={styles.textstyle}>Pan + Electricity Bill</Text>
						</View>
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<ScrollView>
				<View style={styles.container}>{content}</View>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	new: {
		marginTop: 140
	},
	listItem: {
		flex: 1,
		padding: 13,
		margin: 22,
		backgroundColor: '#5A7BB5'
	},
	textstyle: {
		fontFamily: 'sans-serif-medium',
		fontSize: 25,
		paddingLeft: 30,
		color: 'white'
	}
});

const mapStateToProps = (state) => {
	return {
		onStatus: state.kyc.status,
		isScreenLoading: state.ui.screenLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCheckKYC: () => {
			dispatch(checkKYC());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
