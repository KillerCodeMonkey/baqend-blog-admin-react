import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PostListItem extends Component {
  render() {
    const date = new Date(this.props.post.publishedAt)
    const dateTimeString = date.toDateString() + ' ' + date.toTimeString()
    return (
      <tr>
        <td>
          <Link to={"/admin/posts/" + this.props.post.slug}>
            { this.props.post.title }
            ({ this.props.post.comments ? this.props.post.comments.size : 0 })
          </Link>
        </td>
        <td>
          { dateTimeString }
        </td>
      </tr>
    )
  }
}

PostListItem.propTypes = {
  'post': PropTypes.object.isRequired,
}

export default PostListItem
