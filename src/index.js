import 'babel-polyfill';
import thunkMiddleWare from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';

import {
    fetchPosts,
    invalidateSubreddit,
    selectSubreddit
} from './actions';

const loggerMiddleWare = createLogger();
const store = createStore(rootReducer, applyMiddleware(
    {
        thunkMiddleWare,
        loggerMiddleWare
    }
));

store.selectSubreddit('javascript');
store.dispatch(fetchPosts('javascript')).then(data => console.log(data));
        