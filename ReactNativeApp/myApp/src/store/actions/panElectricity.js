import { PAN_STATUS, SET_ADDRESS } from './actionTypes';
import { domainName, kycSetDetails, authGetToken, kycSet, screenStartLoading, screenStopLoading } from './index';
import { startMainTabs } from '../../screens/MainTabs/startMainTabs';
import Toast from 'react-native-root-toast';

export const panStatus = (status) => {
	return {
		type: PAN_STATUS,
		details: status
	};
};
export const panElectricityGet = (panNumber, consumerId) => {
	return (dispatch, getState) => {
		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found');
			})
			.then((token) => {
				authToken = token;
				return fetch('http://' + domainName + '/api/electricity/details/', {
					method: 'POST',
					body: JSON.stringify({
						consumerId: consumerId,
						panNumber: panNumber
					}),
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'JWT ' + authToken
					}
				});
			})
			.catch((err) => {
				console.log(err);
				alert('Something wrong, please try again!');
			})
			.then((res) => res.json())
			.then((parsedRes) => {
				dispatch(kycSetDetails(parsedRes.data));
			});
	};
};

export const verifyElectricityBill = (consumerId, panNumber) => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			dispatch(authGetToken())
				.catch(() => {
					alert('No valid token found');
					reject();
				})
				.then((token) => {
					authToken = token;
					dispatch(screenStartLoading());
					return fetch('http://' + domainName + '/api/electricity/bill/', {
						method: 'POST',
						body: JSON.stringify({
							consumerId: consumerId,
							panNumber: panNumber
						}),
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'JWT ' + authToken
						}
					});
				})
				.catch((err) => {
					console.log(err);
					dispatch(screenStopLoading());
					alert('Something wrong, please try again!');
					reject();
				})
				.then((res) => res.json())
				.then((parsedRes) => {
					if (parsedRes.success) {
						dispatch(kycSetDetails(parsedRes.data));
						dispatch(kycSet(parsedRes.data.uid));
						dispatch(screenStopLoading());
						resolve(parsedRes);
					} else {
						dispatch(panStatus(null));
						dispatch(screenStopLoading());
						resolve(parsedRes);
					}
				});
		});
		return promise;
	};
};
