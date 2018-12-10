import fetch from 'cross-fetch';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const FETCH_SUBREDDIT = 'FETCH_SUBREDDIT';
export const RECIEVE_SUBREDDIT = 'RECIEVE_SUBREDDIT';

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    };
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

export function fetchSubreddit(subreddit) {
    return {
        type: FETCH_SUBREDDIT,
        subreddit
    }
}

export function recieveSubreddit(subreddit, json) {
    return {
        type: RECIEVE_SUBREDDIT,
        subreddit,
        posts: json.data.children.map(child => child.data.title),
        lastUpdated: Date.now()
    }
}

//fetch('https://www.reddit.com/r/javascript.json').then(res => res.json()).then(data => data.data.children.map(child => l(child.data)));

export function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(fetchSubreddit(subreddit));
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(res => res.json(), error => console.log(error))
            .then(json => dispatch(recieveSubreddit(subreddit, json)));
    }
}
