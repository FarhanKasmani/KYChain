import { Navigation } from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth';
import Temp from './src/screens/Auth/Temp';

import Tab1 from './src/screens/Tab1/Tab1';
import Tab2 from './src/screens/Tab2/Tab2';
import Tab3 from './src/screens/Tab3/Tab3';

import OTP from './src/components/OTP/OTP';
import AadharStart from './src/screens/Tab1/Aadhar/AadharStart';
import Verification from './src/screens/Tab1/Aadhar/Verification';
// import InputAadhar from './src/screens/Tab1/Aadhar/InputAadhar';

import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import { Provider } from 'react-redux';

import PushNotification from './src/screens/PushNotification/PushNotification';
import bgMessaging from './src/screens/PushNotification/bgMessaging';

import configureStore from './src/store/configureStore';
import InputConsumerId from './src/screens/Tab1/PanElectricty/InputConsumerId';
import PanVerification from './src/screens/Tab1/PanElectricty/PanVerification';

import InputPan from './src/screens/Tab1/PanElectricty/InputPan';
import PanStart from './src/screens/Tab1/PanElectricty/PanStart';
import QRCode from './src/screens/Tab1/PanElectricty/QRCode';
import InputAadhar from './src/screens/Tab1/Aadhar/InputAadhar';

import ActivityIndicatorScreen from './src/components/UI/ActivityIndicatorScreen/ActivityIndicatorScreen';
import SwitchExample from './src/components/UI/SwitchExample/SwitchExample';
import Tab4 from './src/screens/Tab4/Tab4';

const store = configureStore();

Navigation.registerComponentWithRedux('myApp.AuthScreen', () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux('myApp.SideDrawer', () => SideDrawer, Provider, store);
Navigation.registerComponentWithRedux('myApp.Tab1', () => Tab1, Provider, store);
Navigation.registerComponentWithRedux('myApp.Tab2', () => Tab2, Provider, store);
Navigation.registerComponentWithRedux('myApp.Tab3', () => Tab3, Provider, store);
Navigation.registerComponentWithRedux('myApp.Tab4', () => Tab4, Provider, store);

Navigation.registerComponentWithRedux('Aadhar.Start', () => AadharStart);
// Navigation.registerComponentWithRedux('Aadhar.InputAadhar', () => InputAadhar);
Navigation.registerComponentWithRedux('Aadhar.Verification', () => Verification, Provider, store);
Navigation.registerComponentWithRedux('OTP', () => OTP, Provider, store);

Navigation.registerComponentWithRedux('PanElectricity.InputConsumerId', () => InputConsumerId, Provider, store);
Navigation.registerComponentWithRedux('PanElectricity.InputPan', () => InputPan, Provider, store);
Navigation.registerComponentWithRedux('PanElectricity.PanStart', () => PanStart);
Navigation.registerComponentWithRedux('PanElectricity.PanVerification', () => PanVerification, Provider, store);
Navigation.registerComponentWithRedux('PanElectricity.QRCode', () => QRCode, Provider, store);

Navigation.registerComponentWithRedux('PushNotification', () => PushNotification);
Navigation.registerComponentWithRedux('RNFirebaseBackgroundMessage', () => bgMessaging);

Navigation.registerComponentWithRedux('Temp', () => Temp);
Navigation.registerComponentWithRedux('ActivityIndicatorScreen', () => ActivityIndicatorScreen);
Navigation.registerComponentWithRedux('SwitchExample', () => SwitchExample);

Navigation.registerComponentWithRedux('Aadhar.InputAadhar', () => InputAadhar);

// Navigation.registerComponentWithRedux('aadhar.inputAadhar', () => InputAadhar, Provider, store);

// Navigation.setRoot({
// 	root: {
// 		component: {
// 			name: 'PushNotification'
// 		}
// 	}
// });

const App = () => {
	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: 'myApp.AuthScreen',
							passProps: {
								text: 'stack with one child'
							}
						}
					}
				],
				options: {
					topBar: {
						title: {
							text: 'Login'
						}
					}
				}
			}
		}
	});
};
App();

export default App;
