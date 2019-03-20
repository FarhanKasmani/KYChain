import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, ImageBackground } from 'react-native';
import { Navigation } from 'react-native-navigation';
import StartButton from '../../../components/UI/NewButton/StartButton';

class AadharStart extends Component {
	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
	}

	componentWillUnmount() {
		// Not mandatory
		if (this.navigationEventListener) {
			this.navigationEventListener.remove();
		}
	}

	render() {
		return (
			<View>
				<StartButton
					title="Start"
					pressFunction={() => {
						Navigation.push(this.props.componentId, {
							component: {
								name: 'Aadhar.InputAadhar'
							}
						});
					}}
				/>
			</View>
		);
	}
}

export default AadharStart;
