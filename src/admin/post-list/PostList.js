import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchPosts, deletePost } from '../../actions'

import PostListItem from './PostListItem'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  handleDelete(event, post) {
    this.props.deletePost(post)
  }

  render() {
    let postRows = this.props.posts.map((post) => {
      return <PostListItem post={ post } handleDelete={ this.handleDelete } key={ post.id } />
    })

    return (
      <div className="container-fluid">
        <Link to="/admin/posts/new" className="btn btn-success">Neuer Beitrag</Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Veröffentlicht</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { postRows }
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  state => ({ posts: state.posts }),
  { deletePost, fetchPosts }
)(PostList)
