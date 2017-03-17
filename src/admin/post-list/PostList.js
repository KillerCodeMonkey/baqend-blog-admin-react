import React, { Component } from 'react'

import PostListItem from './PostListItem'

import { db } from 'baqend'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      loading: true
    }
  }

  componentDidMount() {
    db.ready()
      .then(() => {
        return db.Post
          .find()
          .resultList()
      })
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

  render() {
    let postRows = this.state.posts.map((post) => {
      return <PostListItem post={ post } key={ post.id } />
    })

    return (
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Veröffentlicht</th>
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
