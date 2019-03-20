import { UI_START_LOADING, UI_STOP_LOADING, SCREEN_START_LOADING, SCREEN_STOP_LOADING } from '../actions/actionTypes';

const initialState = {
	isLoading: false,
	screenLoading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UI_START_LOADING:
			return {
				...state,
				isLoading: true
			};
			break;

		case UI_STOP_LOADING:
			return {
				...state,
				isLoading: false
			};
			break;

		case SCREEN_START_LOADING:
			return {
				...state,
				screenLoading: true
			};
			break;

		case SCREEN_STOP_LOADING:
			return {
				...state,
				screenLoading: false
			};
			break;
		default:
			return state;
	}
};

export default reducer;
