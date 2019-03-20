import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeadingText from '../UI/HeadingText/HeadingText';

class AlertScreen extends Component {
	render() {
		let icon = null;
		if (this.props.type == 'alert') {
			icon = <Icon name="ios-alert" size={170} color="red" style={styles.drawerItemIcon} />;
		} else if (this.props.type == 'checkmark') {
			icon = <Icon name="ios-checkmark" size={170} color="green" style={styles.drawerItemIcon} />;
		}
		return (
			<View style={styles.notification}>
				{icon}
				<HeadingText style={{ alignItems: 'center' }}>{this.props.text}</HeadingText>
				{this.props.uid ? <HeadingText>UNI-KYC ID: {this.props.uid}</HeadingText> : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	notification: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default AlertScreen;
