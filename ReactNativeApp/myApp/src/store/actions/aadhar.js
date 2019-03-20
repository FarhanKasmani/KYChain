import {
	authGetToken,
	kycSetDetails,
	kycSet,
	panStatus,
	screenStopLoading,
	screenStartLoading,
	blockChainDomain,
	domainName
} from './index';
import { Navigation } from 'react-native-navigation';
import starMainTabs from '../../screens/MainTabs/startMainTabs';
import Toast from 'react-native-root-toast';

export const checkAadhar = (aadharNumber) => {
	return (dispatch, getState) => {};
};

export const aadharGet = (aadharNumber) => {
	return (dispatch, getState) => {
		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found!');
			})
			.then((token) => {
				authToken = token;
				return fetch('http://' + domainName + '/api/rekognition/aadhar/', {
					method: 'POST',
					body: JSON.stringify({
						aadharNumber: aadharNumber
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
			})
			.then((res) => res.json())
			.then((parsedRes) => {
				console.log(parsedRes.data);
				dispatch(kycSetDetails(parsedRes.data));
			});
	};
};

export const compareFaces = (cardPhoto, original) => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			const data = new FormData();
			data.append('original', original);
			data.append('cardPhoto', cardPhoto);
			data.append('no', 'abcdefg');
			dispatch(authGetToken())
				.catch(() => {
					alert('No valid token found');
					reject();
				})
				.then((token) => {
					authToken = token;
					return fetch('http://' + domainName + '/api/rekognition/face/', {
						method: 'POST',
						body: data,
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: 'JWT ' + authToken
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
					let result = parsedRes.success ? parsedRes.success : parsedRes.error;
					alert(result);
				});
		});
		return promise;
	};
};

const configureUID = (parsedRes) => {
	dispatch(kycSetDetails(parsedRes.data));
	dispatch(kycSet(true));

	// Get UID from parsed result
	// Send it to blockchain
};

export const faceVerify = (original, number, doc) => {
	return (dispatch, getState) => {
		const data = new FormData();
		data.append('original', original);
		data.append(doc + 'Number', number);
		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found');
			})
			.then((token) => {
				authToken = token;
				dispatch(screenStartLoading());
				return fetch('http://' + domainName + '/api/rekognition/faceVerify/', {
					method: 'POST',
					body: data,
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: 'JWT ' + authToken
					}
				});
			})
			.catch((err) => {
				console.log(err);
				alert('Something wrong, please try again!');
				dispatch(screenStopLoading());
				starMainTabs();
			})
			.then((res) => res.json())
			.then((parsedRes) => {
				if (parsedRes.success) {
					// If UID is present in parsed result, document is aadhar
					if (parsedRes.data.uid) {
						// dispatch(screenStopLoading());
						console.log(parsedRes.data);
						dispatch(kycSet(parsedRes.data.uid));
						dispatch(kycSetDetails(parsedRes.data));
						Toast.show(parsedRes.success, {
							duration: Toast.durations.SHORT,
							position: Toast.positions.BOTTOM,
							shadow: true,
							animation: true,
							ToashideOnPress: true,
							delay: 0
						});
						dispatch(screenStopLoading());
						// starMainTabs();
						// const promise = new Promise((resolve, reject) => {
						// 	resolve(true);
						// });
						// return promise;
					} else {
						dispatch(panStatus(parsedRes.data.panNumber));
						dispatch(screenStopLoading());
						Toast.show(parsedRes.success, {
							duration: Toast.durations.SHORT,
							position: Toast.positions.BOTTOM,
							shadow: true,
							animation: true,
							hideOnPress: true,
							delay: 0
						});
					}
				} else {
					dispatch(screenStopLoading());
					alert('Face is not matching');
					// Toast.show(parsedRes.error, {
					// 	duration: Toast.durations.SHORT,
					// 	position: Toast.positions.BOTTOM,
					// 	shadow: true,
					// 	animation: true,
					// 	hideOnPress: true,
					// 	delay: 0
					// });
					starMainTabs();
				}
			});
	};
};

export const otpSend = (otp, aadharNumber) => {
	return (dispatch, getState) => {
		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found');
			})
			.then((token) => {
				authToken = token;
				return fetch('http://' + domainName + '/api/rekognition/otpSend/', {
					method: 'POST',
					body: JSON.stringify({
						otp: otp,
						aadharNumber: aadharNumber
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
				if (parsedRes.success) {
					Toast.show(parsedRes.success, {
						duration: Toast.durations.SHORT,
						position: Toast.positions.BOTTOM,
						shadow: true,
						animation: true,
						hideOnPress: true,
						delay: 0
					});
				} else {
					Toast.show(parsedRes.error, {
						duration: Toast.durations.SHORT,
						position: Toast.positions.BOTTOM,
						shadow: true,
						animation: true,
						hideOnPress: true,
						delay: 0
					});
				}
			});
	};
};

export const otpVerifyAadhar = (aadharNumber) => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			dispatch(authGetToken())
				.catch(() => {
					alert('No valid token found');
					resolve();
				})
				.then((token) => {
					authToken = token;
					dispatch(screenStartLoading());
					return fetch('http://' + domainName + '/api/rekognition/otpVerifyAadhar/', {
						method: 'POST',
						body: JSON.stringify({
							aadharNumber: aadharNumber
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
					resolve();
				})
				.then((res) => res.json())
				.then((parsedRes) => {
					if (parsedRes.success) {
						// Generate UID in server and POST it to block chain
						dispatch(kycSetDetails(parsedRes.data));
						dispatch(kycSet(parsedRes.data.uid));
						dispatch(screenStopLoading());
						resolve('KYC completed sucessfully');
					} else {
						dispatch(screenStopLoading());
						resolve(parsedRes.error);
					}
				});
		});
		return promise;
	};
};
