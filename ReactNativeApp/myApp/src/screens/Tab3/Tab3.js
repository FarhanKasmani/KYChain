import React, { Component } from 'react';
import { ScrollView, View, Text, Button, Switch, StyleSheet, RefreshControl } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { viewPermissions } from '../../store/actions/index';
import SwitchExample from '../../components/UI/SwitchExample/SwitchExample';
import AlertScreen from '../../components/AlertScreen/AlertScreen';

class Tab3 extends Component {
	state = {
		refreshing: false,
		toggle: false
	};

	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
		console.log('Tab 3 opened');
		this.props.onViewPermissions();
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

	_refreshHandler = () => {
		this.setState({
			...this.state,
			refreshing: true
		});
		this.props.onViewPermissions().then(() => {
			this.setState({ refreshing: false });
		});
	};

	render() {
		let details = null;
		if (!this.props.requestingCompanyDetails) {
			details = <AlertScreen text="No available requests" type="alert" />;
		} else {
			data = {
				name: 'Name',
				phone: 'Phone',
				address: 'Address',
				dob: 'Date of Birth',
				gender: 'Gender'
			};
			let temp = this.props.requestingCompanyDetails;
			console.log(temp);
			details = Object.keys(temp).map((orgName) => {
				let attr = temp[orgName].data;
				let key = temp[orgName].key;
				let attributes = Object.keys(attr).map((attribute) => (
					<View key={attribute} style={styles.myrow}>
						<Text style={styles.subheading}>
							{data[attribute] == 'Phone' ||
							data[attribute] == 'Address' ||
							data[attribute] == 'Date of Birth' ? (
								<Text style={{ color: 'red' }}>*</Text>
							) : null}
							{data[attribute]}:
						</Text>
						{this.props.status ? (
							<SwitchExample
								attribute={attribute}
								orgkey={key}
								value={attr[attribute]}
								style={{ transform: [ { scaleX: 2 }, { scaleY: 2 } ] }}
							/>
						) : null}
					</View>
				));
				return (
					<View key={temp[orgName].key} style={styles.card}>
						<Text style={styles.heading}>{orgName}</Text>
						<View
							style={{
								borderBottomColor: '#3498DB',
								borderBottomWidth: 2
							}}
						/>
						{attributes}
						<Text style={{ color: 'red' }}>* mandatory</Text>
					</View>
				);
			});
		}
		return (
			<ScrollView
				refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._refreshHandler} />}
			>
				{this.props.requestingCompanyDetails ? <View style={styles.container}>{details}</View> : null}
			</ScrollView>
		);
	}
}
var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	myrow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10
	},
	heading: {
		fontWeight: '400',
		fontSize: 24,
		color: 'white',
		backgroundColor: '#3498db'
	},
	subheading: {
		fontSize: 25,
		color: 'black',
		marginTop: 10
	},
	card: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderRadius: 3,
		borderColor: '#3498DB',
		width: '90%',
		marginTop: 20,
		padding: 10
	}
});

const mapStateToProps = (state) => {
	return {
		status: state.kyc.status,
		requestingCompanyDetails: state.grantrevoke.requestingCompanyDetails
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onViewPermissions: () => dispatch(viewPermissions())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
