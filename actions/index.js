import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

function requestPosts(transactionType) {
  return {
    type: REQUEST_POSTS,
    transactionType
  }
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.results,
    receivedAt: Date.now()
  }
}

function fetchPosts(transactionType) {
  return dispatch => {
    dispatch(requestPosts(transactionType));
    return fetch(`https://www.oipa.nl/api/transactions/?format=json&transaction_type=${transactionType}&fields=activity,transaction_type,value_date,value,currency`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(transactionType, json)))
  }
}

function shouldFetchPosts(state, transactionType) {
  const posts = state.postsByReddit[transactionType];
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(transactionType) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), transactionType)) {
      return dispatch(fetchPosts(transactionType))
    }
  }
}
