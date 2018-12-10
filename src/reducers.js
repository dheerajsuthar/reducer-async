import { combineReducers } from 'redux';
import {
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    FETCH_SUBREDDIT,
    RECIEVE_SUBREDDIT
} from './actions';

function selectedSubreddit(state = 'react', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        lastUpdated: null
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, { didInvalidate: true });
        case FETCH_SUBREDDIT:
            return Object.assign({}, state, { isFetching: true, didInvalidate: false });
        case RECIEVE_SUBREDDIT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.lastUpdated
            });
        default:
            return state;
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case FETCH_SUBREDDIT:
        case RECIEVE_SUBREDDIT:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    selectedSubreddit,
    postsBySubreddit
});

export default rootReducer;
