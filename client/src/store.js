import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlware = [thunk;

const store = createStore(() => [], {}, applyMiddleware(...middleware));

export default store;