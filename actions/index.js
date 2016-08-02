import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_TRANSACTION = 'SELECT_TRANSACTION';

/**
 * Select post action.
 *
 * @param transaction
 * @returns {{type: string, transaction: *}}
 */
export function selectTransaction(transaction) {
  return {
    type: SELECT_TRANSACTION,
    transaction
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
 * @param transaction
 * @param json
 * @returns {{type: string, transaction: *, posts: (number|*), receivedAt: number}}
 */
function receivePosts(transaction, json) {
  return {
    type: RECEIVE_POSTS,
    transaction,
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

    return fetch(`https://www.oipa.nl/api/transactions/?format=json&transaction_type=${transactionType}&page_size=1000&fields=activity,transaction_type,value_date,value,currency`)
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
  const posts = state.postsByTransaction[transactionType];
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
