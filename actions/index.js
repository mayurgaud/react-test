import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';

/**
 * Select post action.
 *
 * @param reddit
 * @returns {{type: string, reddit: *}}
 */
export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

/**
 * Request posts action.
 *
 * @param transactionType
 * @returns {{type: string, transactionType: *}}
 */
function requestPosts(transactionType) {
  return {
    type: REQUEST_POSTS,
    transactionType
  }
}

/**
 * Receive posts action.
 *
 * @param reddit
 * @param json
 * @returns {{type: string, reddit: *, posts: (number|*), receivedAt: number}}
 */
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.results,
    receivedAt: Date.now()
  }
}

/**
 * Fetches transactions from the api based on the transaction type.
 *
 * @param transactionType
 * @returns {function(*)}
 */
function fetchPosts(transactionType) {
  return dispatch => {
    dispatch(requestPosts(transactionType));

    return fetch(`https://www.oipa.nl/api/transactions/?format=json&transaction_type=${transactionType}&fields=activity,transaction_type,value_date,value,currency`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(transactionType, json)))
  }
}

/**
 * Check if the state has transactions or not of a particular transaction type.
 *
 * @param state
 * @param transactionType
 * @returns {boolean}
 */
function shouldFetchPosts(state, transactionType) {
  const posts = state.postsByReddit[transactionType];
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
}

/**
 * Fetches transactions when requested.
 *
 * @param transactionType
 * @returns {function(*, *)}
 */
export function fetchPostsIfNeeded(transactionType) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), transactionType)) {
      return dispatch(fetchPosts(transactionType))
    }
  }
}
