import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PostListItem extends Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={"/admin/posts/" + this.props.post.slug}>
            { this.props.post.title }
          </Link>
        </td>
        <td>
          { this.props.post.publishedAt ? this.props.post.publishedAt.toISOString() : '-' }
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
