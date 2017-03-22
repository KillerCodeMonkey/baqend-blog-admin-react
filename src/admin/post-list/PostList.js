import React, { Component } from 'react'
import { Link } from 'react-router'

import PostListItem from './PostListItem'
import PostService from '../../shared/PostService'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      loading: true
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    PostService.getAll()
      .then(posts => {
        this.setState({
          posts: posts,
          loading: false
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  handleDelete(event, post) {
    event.preventDefault()
    const index = this.state.posts.indexOf(post)

    PostService.delete(post).then(() => {
      this.state.posts.splice(index, 1)

      this.setState({
        posts: this.state.posts
      })
    })
  }

  render() {
    let postRows = this.state.posts.map((post) => {
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

export default PostList
