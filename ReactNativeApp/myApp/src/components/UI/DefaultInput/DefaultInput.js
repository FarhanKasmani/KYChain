import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

class DefaultInput extends Component {
	state = {
		borderColor: '#bbb'
	};

	onFocus = () => {
		this.setState({
			borderColor: '#4ABBCF'
		});
	};

	onBlur = () => {
		this.setState({
			borderColor: '#bbb'
		});
	};

	render() {
		return (
			<TextInput
				{...this.props}
				style={[
					styles.input,
					this.props.style,
					!this.props.valid && this.props.touched ? styles.invalid : null,
					{ borderColor: this.state.borderColor }
				]}
				onBlur={() => this.onBlur()}
				onFocus={() => this.onFocus()}
			/>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: 'black',
		padding: 5,
		marginTop: 7,
		marginBottom: 7,
		borderRadius: 10,
		paddingLeft: 15,
		height: 45
	},
	invalid: {
		backgroundColor: '#f9c0c0',
		borderColor: 'red'
	}
});

export default DefaultInput;
