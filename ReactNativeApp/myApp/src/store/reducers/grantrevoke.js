import { SET_REQUESTING_COMPANY_DETAILS } from '../../store/actions/actionTypes';

const initialState = {
	requestingCompanyDetails: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_REQUESTING_COMPANY_DETAILS:
			return {
				...state,
				requestingCompanyDetails: action.details
			};
			break;
		default:
			return state;
	}
};

export default reducer;
