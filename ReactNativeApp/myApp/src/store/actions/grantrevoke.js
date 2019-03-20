import { domainName, authGetToken } from './index';
import { SET_REQUESTING_COMPANY_DETAILS } from './actionTypes';
import Toast from 'react-native-root-toast';

export const setRequestingCompanyDetails = (details) => {
	return {
		type: SET_REQUESTING_COMPANY_DETAILS,
		details: details
	};
};

export const viewPermissions = () => {
	return (dispatch, getState) => {
		console.log('Inside view Permissions');
		const promise = new Promise((resolve, reject) => {
			dispatch(authGetToken())
				.catch(() => {
					alert('No valid token found!');
					reject();
				})
				.then((token) => {
					authToken = token;
					return fetch('http://' + domainName + '/api/grantrevoke/view/', {
						method: 'GET',
						headers: {
							Authorization: 'JWT ' + authToken,
							'Content-Type': 'application/json'
						}
					});
				})
				.catch((err) => {
					console.log(err);
					reject();
					alert('Something went wrong, please try again!');
				})
				.then((res) => res.json())
				.then((parsedRes) => {
					console.log(parsedRes);
					dispatch(setRequestingCompanyDetails(parsedRes));
					resolve(parsedRes);
				});
		});
		return promise;
	};
};

export const changePermission = (attribute, key, action) => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			dispatch(authGetToken())
				.catch(() => {
					alert('No valid token found!');
					reject();
				})
				.then((token) => {
					authToken = token;
					return fetch('http://' + domainName + '/api/grantrevoke/action/', {
						method: 'POST',
						body: JSON.stringify({
							attribute: attribute,
							key: key,
							action: action
						}),
						headers: {
							Authorization: 'JWT ' + authToken,
							'Content-Type': 'application/json'
						}
					});
				})
				.catch((err) => {
					console.log(err);
					alert('Something went wrong, please try again!');
					reject();
				})
				.then((res) => res.json())
				.then((parsedRes) => {
					console.log(parsedRes);
					resolve('Done');
					// if (action == 'grant') {
					// 	Toast.show('Permission granted successfully', {
					// 		duration: Toast.durations.SHORT,
					// 		position: Toast.positions.BOTTOM,
					// 		shadow: true,
					// 		animation: true,
					// 		hideOnPress: true,
					// 		delay: 0
					// 	});
					// } else {
					// 	Toast.show('Permission revoked successfully', {
					// 		duration: Toast.durations.SHORT,
					// 		position: Toast.positions.BOTTOM,
					// 		shadow: true,
					// 		animation: true,
					// 		hideOnPress: true,
					// 		delay: 0
					// 	});
					// }
				});
		});
		return promise;
	};
};
