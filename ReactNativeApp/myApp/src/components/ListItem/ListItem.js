import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = (props) => (
	<TouchableOpacity>
		<View style={styles.listItem}>
			<Text style={styles.text}>
				{props.pkey}: {props.value}
			</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		padding: 10,
		backgroundColor: '#eee',
		marginBottom: 5,
		flexDirection: 'row'
		// alignItems: 'center'
	},
	placeImage: {
		marginRight: 8,
		height: 40,
		width: 40
	},
	text: {
		fontSize: 30,
		color: 'black'
	}
});

export default listItem;
