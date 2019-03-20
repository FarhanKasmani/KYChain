import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';
import authReducer from './reducers/auth';
import kycReducer from './reducers/kyc';
import uiReducer from './reducers/ui';
import grreducer from './reducers/grantrevoke';

const rootReducer = combineReducers({
	places: placesReducer,
	auth: authReducer,
	kyc: kycReducer,
	ui: uiReducer,
	grantrevoke: grreducer
});

let composeEnhancers = compose;

if (__DEV__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
	return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
