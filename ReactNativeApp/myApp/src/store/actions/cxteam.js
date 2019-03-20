import { authGetToken, domainName } from './index';
import Toast from 'react-native-root-toast';

export const postIssue = (key, issue) => {
	console.log('Inside post issue');
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			dispatch(authGetToken())
				.catch(() => {
					alert('No valid token found');
					reject();
				})
				.then((token) => {
					authToken = token;
					return fetch('http://' + domainName + '/api/cxteam/postissue/', {
						method: 'POST',
						body: JSON.stringify({
							key: key,
							issue: issue
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
					reject();
				})
				.then((res) => res.json())
				.then((parsedRes) => {
					Toast.show(parsedRes.success, {
						duration: Toast.durations.SHORT,
						position: Toast.positions.BOTTOM,
						shadow: true,
						animation: true,
						hideOnPress: true,
						delay: 0
					});
					resolve();
				});
		});
		return promise;
	};
};

export const viewIssues = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			dispatch(viewPermissions()).then((data) => {
				console.log('Data recieved');
				resolve();
			});
		});
		return promise;
	};
};
