import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';
import { Navigation } from 'react-native-navigation';

class SideDrawer extends Component {
	render() {
		return (
			<View style={[ styles.container, { width: Dimensions.get('window').width * 0.8 } ]}>
				<TouchableOpacity onPress={this.props.onLogout}>
					<View style={styles.drawerItem}>
						<Icon name="ios-log-out" size={30} color="#aaa" style={styles.drawerItemIcon} />
						<Text>Sign Out</Text>
					</View>
				</TouchableOpacity>
				{this.props.uid ? (
					<TouchableOpacity>
						<View style={styles.drawerItem}>
							<Icon name="ios-card" size={30} color="#aaa" style={styles.drawerItemIcon} />
							<Text>UID NO: {this.props.uid}</Text>
						</View>
					</TouchableOpacity>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		backgroundColor: 'white',
		flex: 1
	},
	drawerItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#eee'
	},
	drawerItemIcon: {
		marginRight: 10
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(authLogout())
	};
};

const mapStateToProps = (state) => {
	return {
		uid: state.kyc.status
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
