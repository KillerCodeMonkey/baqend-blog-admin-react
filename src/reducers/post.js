import { List } from 'immutable'
import { db, binding, model } from 'baqend'

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

export function posts(state = List([]), action) {
  let index
  switch (action.type) {
    case POST_DELETED:
      index = state.indexOf(action.post)

      return index > -1 ? List(state).splice(index, 1) : []
    case POST_CREATED:
      return List(state).push(action.post)
    case POST_PREVIEW_IMAGE_DELETED:
    case POST_PREVIEW_IMAGE_UPLOADED:
    case POST_IMAGE_DELETED:
    case POST_IMAGE_UPLOADED:
    case POST_UPDATED:
      index = state.indexOf(action.post)

      let posts = List(state)
      posts[index] = action.post

      return posts
    case POSTS_FETCHED:
      return List(action.posts)
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
      const postJSON = Object.assign({}, action.post.toJSON(), { acl: null })

      return db.Post.fromJSON(postJSON)
    default:
      return state
  }
}

