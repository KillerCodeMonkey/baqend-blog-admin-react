import {
  COMMENT_CREATED,
  COMMENT_DELETED,
  COMMENTS_RECEIVED
} from '../actions'

export function comments(state = [], action) {
  switch (action.type) {
    case COMMENT_DELETED:
      const index = state.indexOf(action.comment)

      return index > -1 ? Array.from(state).splice(index, 1) : []
    case COMMENT_CREATED:
      return Array.from(state).push(action.comment)
    case COMMENTS_RECEIVED:
      return action.comments
    default:
      return state
  }
}
