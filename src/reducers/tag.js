import {
  TAG_CREATED,
  TAG_DELETED,
  TAG_UPDATED,
  TAGS_FETCHED
} from '../actions'

export function tags(state = [], action) {
  let index
  switch (action.type) {
    case TAG_DELETED:
      index = state.indexOf(action.tag)

      return index > -1 ? Array.from(state).splice(index, 1) : []
    case TAG_CREATED:
      return Array.from(state).push(action.tag)
    case TAG_UPDATED:
      let tags = Array.from(state)
      index = tags.indexOf(action.tag)

      tags[index] = action.tag
      return tags
    case TAGS_FETCHED:
      return action.tags
    default:
      return state
  }
}
