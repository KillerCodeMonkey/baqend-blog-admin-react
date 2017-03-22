import React, { Component, PropTypes } from 'react'

import CommentService from '../../shared/CommentService'
import CommentListItem from './CommentListItem'

class CommentList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: this.props.comments || []
    }
    this.deleteComment = this.deleteComment.bind(this)
  }

  deleteComment(event, comment) {
    CommentService
      .delete(comment)
      .then(() => {
        const index = this.props.comments.indexOf(comment)
        this.props.comments.splice(index, 1)

        this.setState({
          comments: this.props.comments
        })
      })
  }

  render() {
    let commentRows = this.state.comments.map((comment) => {
      return <CommentListItem comment={ comment } handleDelete={ this.deleteComment } key={ comment.id } />
    })

    return (
      <div className="container">
        { commentRows }
      </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList
