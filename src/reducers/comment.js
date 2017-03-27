import { List } from 'immutable';

import {
  COMMENT_CREATED,
  COMMENT_DELETED,
  COMMENTS_RECEIVED
} from '../actions'

export function comments(state = List([]), action) {
  switch (action.type) {
    case COMMENT_DELETED:
      const index = state.indexOf(action.comment)

      return index > -1 ? List(state).splice(index, 1) : []
    case COMMENT_CREATED:
      return List(state).push(action.comment)
    case COMMENTS_RECEIVED:
      return List(action.comments)
    default:
      return state
  }
}
