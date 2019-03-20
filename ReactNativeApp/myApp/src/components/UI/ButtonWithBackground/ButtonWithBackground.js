import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

const buttonWithBackground = (props) => {
	const content = (
		<View style={[ styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null ]}>
			<Text style={[ styles.fontstyle, props.disabled ? styles.disabledText : null ]}>{props.children}</Text>
		</View>
	);

	if (props.disabled) {
		return content;
	} else {
		return <TouchableHighlight onPress={props.onPress}>{content}</TouchableHighlight>;
	}
};

const styles = StyleSheet.create({
	button: {},
	fontstyle: {
		fontWeight: '500',
		color: 'black'
	},
	disabled: {
		backgroundColor: '#eee',
		borderColor: '#aaa'
	},
	disabledText: {
		color: '#aaa'
	}
});

export default buttonWithBackground;
