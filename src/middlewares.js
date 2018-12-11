import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';

import {
    fetchPosts,
    invalidateSubreddit,
    selectSubreddit
} from './actions';

console.log('\nnaive approach 1');
let store = createStore(rootReducer);
console.log('dispatching ', invalidateSubreddit('react'));
store.dispatch(invalidateSubreddit('react'));
console.log('next state ', store.getState());

console.log('\nnaive approach 2 (Monkey Patching)');
const next = store.dispatch;
store.dispatch = action => {
    console.log('dispatching ', action);
    const result = next(action);
    console.log('next state ', store.getState());
    return result; //same as action provided.
};
store.dispatch(invalidateSubreddit('react'));

console.log('\nnaive approach 3 (allows chaining)');
function logger(store) {
    return function wrapDispatchForlogging(next) {
        return function dispatchAndLog(action) {
            console.log('dispatching ', action);
            const result = next(action);
            console.log('next state ', store.getState());
            return result;
        }
    }
}

store = createStore(rootReducer, applyMiddleware(logger));
store.dispatch(invalidateSubreddit('react'));

console.log('\nvanilla promise');
const vanillaPromise = store => next => action => {
    if (typeof action.then !== 'function') {
        return next(action);
    }
    return Promise.resolve(action).then(store.dispatch);
};