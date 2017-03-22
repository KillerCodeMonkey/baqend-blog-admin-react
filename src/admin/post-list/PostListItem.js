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
          </Link>
        </td>
        <td>
          { dateTimeString }
        </td>
        <td>
          <button type="button" className="btn btn-danger pull-right" onClick={e => this.props.handleDelete(e, this.props.post) }>Löschen</button>
        </td>
      </tr>
    )
  }
}

PostListItem.propTypes = {
  'post': PropTypes.object.isRequired,
  'handleDelete': PropTypes.func.isRequired
}

export default PostListItem
