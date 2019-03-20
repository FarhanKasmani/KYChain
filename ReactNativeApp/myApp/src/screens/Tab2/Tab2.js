import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import AlertScreen from '../../components/AlertScreen/AlertScreen';
import ListItem from '../../components/ListItem/ListItem';

class Tab2 extends Component {
	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
	}

	componentWillUnmount() {
		// Not mandatory
		if (this.navigationEventListener) {
			this.navigationEventListener.remove();
		}
	}

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
		data = {
			panNumber: 'Pan Number',
			aadharNumber: 'Aadhar Number',
			name: 'Name',
			gender: 'Gender',
			dob: 'Date of Birth',
			address: 'Address',
			phone: 'Phone'
		};

		let details = <AlertScreen text="Complete your KYC process to view details" type="alert" />;
		if (this.props.details) {
			details = Object.keys(this.props.details).map((ingKey) => (
				<ListItem pkey={data[ingKey]} value={this.props.details[ingKey]} />
			));
		}
		return <View style={styles.container}>{details}</View>;
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	heading: {
		fontWeight: '400',
		fontSize: 24,
		color: 'black'
	},
	subheading: {
		fontSize: 16,
		color: 'black',
		marginTop: 10
	},
	card: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 3,
		borderColor: '#000',
		width: '80%',
		marginTop: 20,
		padding: 10
	}
});

const mapStateToProps = (state) => {
	return {
		details: state.kyc.details,
		status: state.kyc.status
	};
};

export default connect(mapStateToProps, null)(Tab2);
