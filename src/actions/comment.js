import { db } from 'baqend'

import { isLoading, isNotLoading } from './loading'

export const COMMENT_DELETED = 'COMMENT_DELETED'
function commentDeleted(comment) {
  return {
    type: COMMENT_DELETED,
    comment
  }
}
export function deleteComment(comment) {
  return (dispatch, getState) => {
    return comment.delete()
      .then(() => {
        dispatch(commentDeleted(comment))
        dispatch(isNotLoading())

        return
      })
      .catch(() => dispatch(isNotLoading()))
  }
}

export const COMMENTS_FETCHED = 'COMMENTS_FETCHED'
function commentsFetched(comments) {
  return {
    type: COMMENTS_FETCHED,
    comments
  }
}
export function fetchComments (post) {
  return (dispatch, getState) => {

    dispatch(isLoading())

    return db.Comment
             .find()
             .equal('post', post)
             .resultList()
             .then(comments => {
               dispatch(isNotLoading())
               dispatch(commentsFetched(comments))

               return comments
             })
             .catch(() => dispatch(isNotLoading()))
  }
}
