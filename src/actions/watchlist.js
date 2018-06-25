import * as constants from '../constants';

export function remove(results) {
  return {
    type: constants.REMOVE_FROM_WATCHLIST,
    payload: results
  }
}

export function add(results) {
  return {
    type: constants.ADD_TO_WATCHLIST,
    payload: results
  }
}

export function removeFromWatchlist(results) {
    return {
      type: constants.REMOVE_FROM_WATCHLIST_FROM_WATCHLIST,
      payload: results
    }
}