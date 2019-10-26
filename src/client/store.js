import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer';

const middlewares = [
    thunk,
    process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
