import {
  IS_LOADING,
  IS_NOT_LOADING
} from '../actions'

export function loading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return true
    case IS_NOT_LOADING:
      return false
    default:
      return state
  }
}
