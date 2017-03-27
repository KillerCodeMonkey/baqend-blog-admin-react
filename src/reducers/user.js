import {
  LOGGED_IN,
  LOGGED_OUT,
  SET_USER
} from '../actions'

export function user(state = null, action) {
  switch (action.type) {
    case LOGGED_OUT:
      return null
    case SET_USER:
    case LOGGED_IN:
      return action.user
    default:
      return state
  }
}
