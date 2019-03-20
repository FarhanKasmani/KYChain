/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

class PushNotification extends Component {
	state = {
		token: null
	};

	componentDidMount() {
		this.checkPermission();
		this.createNotificationListeners();
	}

	componentWillMount() {
		this.notificationListener;
		this.notificationOpenedListener;
	}

	checkPermission() {
		firebase.messaging().hasPermission().then((enabled) => {
			if (enabled) {
				this.getToken();
			} else {
				firebase
					.messaging()
					.requestPermission()
					.then(() => {
						this.getToken();
					})
					.catch((error) => {
						alert('User rejected');
					});
			}
		});
	}

	getToken() {
		firebase.messaging().getToken().then((fcmToken) => {
			if (fcmToken) {
				console.log(fcmToken);
				this.setState({
					token: fcmToken
				});
			} else {
				alert('User device does not have a token');
			}
		});
	}

	createNotificationListeners() {
		this.notificationListener = firebase.notifications().onNotification((notification) => {
			const { title, body } = notification;
			console.log('onNotification:');

			const localNotification = new firebase.notifications.Notification({
				sound: 'sampleaudio',
				show_in_foreground: true
			})
				.setNotificationId(notification.notificationId)
				.setTitle(notification.title)
				// .setSubtitle(notification.subtitle)
				.setBody(notification.body)
				// .setData(notification.data)
				.android.setChannelId('fcm_default_channel') // e.g. the id you chose above
				.android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
				.android.setColor('#000000') // you can set a color here
				.android.setPriority(firebase.notifications.Android.Priority.High);

			firebase.notifications().displayNotification(localNotification).catch((err) => console.error(err));
		});

		const channel = new firebase.notifications.Android.Channel(
			'fcm_default_channel',
			'Demo app name',
			firebase.notifications.Android.Importance.High
		)
			.setDescription('Demo app description')
			.setSound('sampleaudio.mp3');
		firebase.notifications().android.createChannel(channel);

		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			// Get the action triggered by the notification being opened
			const action = notificationOpen.action;
			// Get information about the notification that was opened
			const notification = notificationOpen.notification;
			console.log('onNotificationOpened');
		});

		firebase.notifications().getInitialNotification().then((notificationOpen) => {
			if (notificationOpen) {
				// App was opened by a notification
				// Get the action triggered by the notification being opened
				const action = notificationOpen.action;
				// Get information about the notification that was opened
				const notification = notificationOpen.notification;
				console.log('getInitialNotification');
			}
		});

		this.messageListener = firebase.messaging().onMessage((message) => {
			console.log(JSON.stringify(message));
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>{this.state.token}</Text>
				<Button onPress={this.getTokenHandler} title="Press" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

export default PushNotification;
