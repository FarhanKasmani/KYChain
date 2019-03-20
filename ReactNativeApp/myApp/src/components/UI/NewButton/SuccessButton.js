import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';

class SuccessButton extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Button style={styles.buttonStyle4} textStyle={styles.textStyle} onPress={this.props.pressFunction}>
					Sucess
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

export default SuccessButton;
