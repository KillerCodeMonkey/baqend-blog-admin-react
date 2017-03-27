import { List } from 'immutable';

import {
  TAG_CREATED,
  TAG_DELETED,
  TAG_UPDATED,
  TAGS_FETCHED
} from '../actions'

export function tags(state = List([]), action) {
  let index
  switch (action.type) {
    case TAG_DELETED:
      index = state.indexOf(action.tag)

      return index > -1 ? List(state).splice(index, 1) : []
    case TAG_CREATED:
      return List(state).push(action.tag)
    case TAG_UPDATED:
      let tags = List(state)
      index = tags.indexOf(action.tag)

      tags[index] = action.tag
      return tags
    case TAGS_FETCHED:
      return List(action.tags)
    default:
      return state
  }
}
