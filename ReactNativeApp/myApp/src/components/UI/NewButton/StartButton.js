import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';

class StartButton extends React.Component {
	render() {
		return (
			<Button
				isDisabled={this.props.disabled}
				style={[ styles.buttonStyle5 ]}
				textStyle={styles.textStyle}
				onPress={this.props.pressFunction}
			>
				{this.props.title}
			</Button>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20
	},
	textStyle: {
		color: 'white'
	},
	buttonStyle4: {
		borderColor: '#27ae60',
		backgroundColor: '#2ecc71'
	},
	buttonStyle5: {
		borderColor: '#2980b9',
		backgroundColor: '#3498db'
	}
});

export default StartButton;
