import React, { Component } from 'react';
import { View, TextInput, Button, Picker, StyleSheet, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import StartButton from '../../components/UI/NewButton/StartButton';
import { postIssue, viewIssues } from '../../store/actions';
import { connect } from 'react-redux';
import AlertScreen from '../../components/AlertScreen/AlertScreen';

class Tab4 extends Component {
	state = {
		selectedOrganisation: 'all',
		issue: ''
	};

	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
		this.props.onViewIssues().then(() => console.log('Now load tab 4'));
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
		let options = [ <Picker.Item label="For all organisation" value="all" /> ];
		let extra = null;
		if (this.props.onCompanyDetails) {
			extra = Object.keys(this.props.onCompanyDetails).map((orgName) => (
				<Picker.Item label={orgName} value={this.props.onCompanyDetails[orgName].key} />
			));
		}
		if (extra) {
			extra.forEach((item) => {
				options.push(item);
			});
		}

		let postForm = null;
		if (!this.props.status) {
			postForm = <AlertScreen text="Please complete your KYC process" type="alert" />;
		} else {
			postForm = (
				<View style={styles.insideview}>
					<Text style={{ fontSize: 20 }}>Select organisation:</Text>
					<Picker
						selectedValue={this.state.selectedOrganisation}
						style={{ width: '100%', borderColor: 'black', borderWidth: 3 }}
						onValueChange={(itemValue, itemIndex) =>
							this.setState({
								...this.state,
								selectedOrganisation: itemValue
							})}
					>
						{options}
					</Picker>
					<DefaultInput
						placeholder="Enter your issue"
						style={[ styles.input ]}
						value={this.state.issue}
						onChangeText={(val) => {
							this.setState({
								...this.state,
								issue: val
							});
						}}
					/>
					<StartButton
						title="Submit"
						pressFunction={() => {
							this.props.onPostIssue(this.state.selectedOrganisation, this.state.issue).then(() => {
								this.setState({
									selectedOrganisation: 'all',
									issue: ''
								});
							});
						}}
						disabled={this.state.issue ? false : true}
					/>
				</View>
			);
		}

		return <View style={styles.container}>{postForm}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	insideview: {
		flex: 1,
		width: '90%',
		justifyContent: 'center'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onPostIssue: (key, issue) => dispatch(postIssue(key, issue)),
		onViewIssues: () => dispatch(viewIssues())
	};
};

const mapStateToProps = (state) => {
	return {
		status: state.kyc.status,
		onCompanyDetails: state.grantrevoke.requestingCompanyDetails
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab4);
