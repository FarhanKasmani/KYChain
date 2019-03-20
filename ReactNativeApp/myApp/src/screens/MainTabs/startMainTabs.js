import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
	Promise.all([
		Icon.getImageSource('ios-paper-plane', 25),
		Icon.getImageSource('ios-eye', 25),
		Icon.getImageSource('ios-people', 25),
		Icon.getImageSource('ios-create', 25),
		Icon.getImageSource('ios-menu', 25)
	]).then((sources) => {
		Navigation.setRoot({
			root: {
				sideMenu: {
					id: 'sideMenu',
					left: {
						component: {
							id: 'Drawer',
							name: 'myApp.SideDrawer'
						}
					},
					center: {
						bottomTabs: {
							children: [
								{
									stack: {
										children: [
											{
												component: {
													name: 'myApp.Tab1'
												}
											}
										],
										options: {
											bottomTab: {
												text: 'Apply for KYC',
												icon: sources[0],
												testID: 'FIRST_TAB_BAR_BUTTON'
											},
											topBar: {
												title: {
													text: 'KYC'
												},
												leftButtons: [
													{
														id: 'sideDrawerToggle',
														icon: sources[4]
													}
												]
											}
										}
									}
								},
								{
									stack: {
										children: [
											{
												component: {
													name: 'myApp.Tab2'
												}
											}
										],
										options: {
											bottomTab: {
												text: 'View KYC Details',
												icon: sources[1],
												testID: 'SECOND_TAB_BAR_BUTTON'
											},
											topBar: {
												title: {
													text: 'KYC Details'
												},
												leftButtons: [
													{
														id: 'sideDrawerToggle',
														icon: sources[4]
													}
												]
											}
										}
									}
								},
								{
									stack: {
										children: [
											{
												component: {
													name: 'myApp.Tab3'
												}
											}
										],
										options: {
											bottomTab: {
												text: 'Manage Permissions',
												icon: sources[2],
												testID: 'SECOND_TAB_BAR_BUTTON'
											},
											topBar: {
												title: {
													text: 'Manage Permissions'
												},
												leftButtons: [
													{
														id: 'sideDrawerToggle',
														icon: sources[4]
													}
												]
											}
										}
									}
								},
								{
									stack: {
										children: [
											{
												component: {
													name: 'myApp.Tab4'
												}
											}
										],
										options: {
											bottomTab: {
												text: 'Raise Issue',
												icon: sources[3],
												testID: 'SECOND_TAB_BAR_BUTTON'
											},
											topBar: {
												title: {
													text: 'Raise Issue'
												},
												leftButtons: [
													{
														id: 'sideDrawerToggle',
														icon: sources[4]
													}
												]
											}
										}
									}
								}
							]
						}
					}
				}
			}
		});
	});
};

export default startTabs;
