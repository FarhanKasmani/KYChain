import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

class ActivityIndicatorScreen extends Component {
	render() {
		return (
			<Modal
				transparent={true}
				animationType={'none'}
				visible={this.props.loading}
				onRequestClose={() => {
					console.log('close modal');
				}}
			>
				<View style={styles.modalBackground}>
					<View style={styles.activityIndicatorWrapper}>
						<ActivityIndicator size="large" animating={this.props.loading} />
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#00000040'
	},
	activityIndicatorWrapper: {
		backgroundColor: '#FFFFFF',
		height: 100,
		width: 100,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});

export default ActivityIndicatorScreen;
