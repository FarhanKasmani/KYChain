import { KYC_SET, KYC_SET_DETAILS, KYC_UNSET_DETAILS } from './actionTypes';
import { domainName, authGetToken, panElectricityGet, aadharGet } from './index';
import { uiStopLoading } from './ui';
import Toast from 'react-native-root-toast';

export const kycSet = (details) => {
	return {
		type: KYC_SET,
		status: details
	};
};

export const kycSetDetails = (details) => {
	return {
		type: KYC_SET_DETAILS,
		details: details
	};
};

export const checkKYC = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			console.log('Inside check kyc');
			dispatch(authGetToken())
				.catch(() => {
					alert('No valid token found');
					reject();
				})
				.then((token) => {
					console.log('Going to send request ');
					return fetch('http://' + domainName + '/api/rekognition/kycStatus/', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'JWT ' + token
						}
					});
				})
				.catch((err) => {
					console.log(err);
					alert('Something wrong, please try again!');
					reject();
				})
				.then((res) => res.json())
				.then((parsedRes) => {
					if (parsedRes.status) {
						// If I get uid my KYC is done
						uid = parsedRes.uid;

						// If you get aadhar number from result query aadhar api Else query PAN API
						if (parsedRes.data.aadhar) {
							dispatch(aadharGet(parsedRes.data.aadhar));
						} else {
							pan = parsedRes.data.pan;
							consumerId = parsedRes.data.consumerId;
							dispatch(panElectricityGet(pan, consumerId));
						}
					}
					dispatch(kycSet(parsedRes.uid));
					resolve();
				});
		});
		return promise;
	};
};
