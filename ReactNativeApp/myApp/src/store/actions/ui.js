import { UI_START_LOADING, UI_STOP_LOADING, SCREEN_START_LOADING, SCREEN_STOP_LOADING } from './actionTypes';

export const uiStartLoading = () => {
	return {
		type: UI_START_LOADING
	};
};

export const uiStopLoading = () => {
	return {
		type: UI_STOP_LOADING
	};
};

export const screenStartLoading = () => {
	return {
		type: SCREEN_START_LOADING
	};
};

export const screenStopLoading = () => {
	return {
		type: SCREEN_STOP_LOADING
	};
};
