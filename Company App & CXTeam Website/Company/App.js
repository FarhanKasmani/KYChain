import React, {Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import DetailsScreeen from './src/screens/DetailsScreen/DetailsScreen'

const AppNavigator = createStackNavigator(
  {
  Home:HomeScreen,
  Details:DetailsScreeen
  },
  {
    initialRouteName:'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    console.disableYellowBox=true;
    return (
      <AppContainer/>
    );
  }
}

