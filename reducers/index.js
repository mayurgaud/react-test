import {combineReducers} from 'redux'
import {
  SELECT_TRANSACTION,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

function selectedTransaction(state = '', action) {
  switch (action.type) {
    case SELECT_TRANSACTION:
      return action.transaction;
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state
  }
}

function postsByTransaction(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.transaction]: posts(state[action.transaction], action)
      });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByTransaction,
  selectedTransaction
});

export default rootReducer
