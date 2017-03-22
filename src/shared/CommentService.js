import db from 'baqend'

export default {
  getForPost: (post) => {
    return db.Comment.find().equal('post', post).resultList()
  },
  delete: (comment) => {
    return comment.delete()
  }
}
