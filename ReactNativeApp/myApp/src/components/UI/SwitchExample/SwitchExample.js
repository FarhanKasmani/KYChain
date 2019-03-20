import React, { Component } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { changePermission } from '../../../store/actions';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

class SwitchExample extends Component {
	state = {
		switchValue: this.props.value
	};

	toggleSwitch = (value) => {
		this.setState({ switchValue: value });
		attribute = this.props.attribute;
		key = this.props.orgkey;
		console.log('Key: ' + key);
		if (value) {
			action = 'grant';
		} else {
			action = 'revoke';
		}
		this.props.onChangePermission(attribute, key, action).then((res) => {
			if (action == 'grant') {
				Toast.show('Permission granted successfully', {
					duration: Toast.durations.SHORT,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
					hideOnPress: true,
					delay: 0
				});
			} else {
				Toast.show('Permission revoked successfully', {
					duration: Toast.durations.SHORT,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
					hideOnPress: true,
					delay: 0
				});
			}
		});
	};

	render() {
		return <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChangePermission: (attribute, key, action) => dispatch(changePermission(attribute, key, action))
	};
};

export default connect(null, mapDispatchToProps)(SwitchExample);
