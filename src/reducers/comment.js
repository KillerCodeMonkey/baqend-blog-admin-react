import { List } from 'immutable';

import {
  COMMENT_DELETED,
  COMMENTS_FETCHED
} from '../actions'

export function comments(state = List([]), action) {
  switch (action.type) {
    case COMMENT_DELETED:
      const index = state.indexOf(action.comment)

      return index > -1 ? List(state).splice(index, 1) : []
    case COMMENTS_FETCHED:
      return List(action.comments)
    default:
      return state
  }
}
