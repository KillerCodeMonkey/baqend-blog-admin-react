import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  deleteComment
} from '../../actions'

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
    this.props.deleteComment(comment)
  }

  render() {
    let commentRows = this.state.comments.map((comment) => {
      return <CommentListItem comment={ comment } handleDelete={ this.deleteComment } key={ comment.id } />
    })

    return (
      <div>
        { commentRows }
      </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default connect(
  state => ({}),
  { deleteComment }
)(CommentList)
