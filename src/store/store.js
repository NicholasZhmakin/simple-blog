import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

const initState = {};

const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
