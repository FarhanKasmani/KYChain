import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';
import StartButton from '../../../components/UI/NewButton/StartButton';

class PanElectricityStart extends Component {
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
								name: 'PanElectricity.InputPan'
							}
						});
					}}
				/>
			</View>
		);
	}
}

export default PanElectricityStart;
