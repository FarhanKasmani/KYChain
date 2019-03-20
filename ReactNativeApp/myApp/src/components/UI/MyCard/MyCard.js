import React, { Component } from 'react';
import { StyleSheet, Button, Text } from 'react-native';

import { Card, CardImage, CardTitle, CardContent, CardAction } from 'react-native-card-view';

class MyCard extends Component {
	render() {
		return (
			<Card>
				<CardTitle>
					<Text style={styles.title}>Card Title</Text>
				</CardTitle>
				<CardContent>
					<Text>Content</Text>
				</CardContent>
				<CardAction>
					<Button style={styles.button} onPress={() => {}} title="Button 1" />
					<Button style={styles.button} onPress={() => {}} title="Button 2" />
				</CardAction>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 38,
		backgroundColor: 'transparent'
	},
	button: {
		marginRight: 10
	}
});

export default MyCard;
