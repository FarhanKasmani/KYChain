import { KYC_SET, KYC_SET_DETAILS, PAN_STATUS, SET_ADDRESS } from '../actions/actionTypes';

const initialState = {
	status: null,
	details: null,
	panStatus: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case KYC_SET:
			return {
				...state,
				status: action.status
			};
			break;
		case KYC_SET_DETAILS:
			return {
				...state,
				details: action.details
			};
			break;
		case PAN_STATUS:
			return {
				...state,
				panStatus: action.details
			};
			break;
		case SET_ADDRESS:
			return {
				...state,
				details: action.details
			};
			break;
		default:
			return state;
	}
};

export default reducer;
