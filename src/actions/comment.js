import { db } from 'baqend'

export const COMMENT_DELETED = 'COMMENT_DELETED'
function commentDeleted(comment) {
  return {
    type: COMMENT_DELETED,
    comment
  }
}
export function deleteComment(comment) {
  return (dispatch, getState) => {
    return comment.delete().then(() => dispatch(commentDeleted(comment)))
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
    return db.Comment
             .find()
             .equal('post', post)
             .resultList()
             .then(comments => dispatch(commentsFetched(comments)))
  }
}
