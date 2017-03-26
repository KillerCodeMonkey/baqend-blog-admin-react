import {
  POST_CREATED,
  POST_DELETED,
  POST_FETCHED,
  POST_IMAGE_DELETED,
  POST_IMAGE_UPLOADED,
  POST_PREVIEW_IMAGE_DELETED,
  POST_PREVIEW_IMAGE_UPLOADED,
  POST_UPDATED,
  POSTS_FETCHED
} from '../actions'

export function posts(state = [], action) {
  let index
  switch (action.type) {
    case POST_DELETED:
      index = state.indexOf(action.post)

      return index > -1 ? Array.from(state).splice(index, 1) : []
    case POST_CREATED:
      return Array.from(state).push(action.post)
    case POST_PREVIEW_IMAGE_DELETED:
    case POST_PREVIEW_IMAGE_UPLOADED:
    case POST_IMAGE_DELETED:
    case POST_IMAGE_UPLOADED:
    case POST_UPDATED:
      index = state.indexOf(action.post)

      let posts = Array.from(state)
      posts[index] = action.post

      return posts
    case POSTS_FETCHED:
      return action.posts
    default:
      return state
  }
}

export function post(state = null, action) {
  switch (action.type) {
    case POST_CREATED:
    case POST_FETCHED:
    case POST_PREVIEW_IMAGE_DELETED:
    case POST_PREVIEW_IMAGE_UPLOADED:
    case POST_IMAGE_DELETED:
    case POST_IMAGE_UPLOADED:
    case POST_UPDATED:
      return action.post
    default:
      return state
  }
}

