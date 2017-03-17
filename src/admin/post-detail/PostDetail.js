import React, { Component } from 'react'

import { db } from 'baqend'

import PostForm from '../../shared/PostForm'

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      comments: [],
      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    db.ready()
      .then(() => {
        return db.Post
          .find()
          .equal('slug', this.props.params.slug)
          .singleResult()
      })
      .then(post => {
        this.setState({
          post: post,
          loading: false
        })
        return db.Comment.find().in('id', post.comments).resultList()
      })
      .then(comments => {
        this.setState({
          comments: comments
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  handleSubmit(event, formData) {
    console.log(event, formData)
  }

  render() {
    let postForm
    if (this.state.post) {
      postForm = <PostForm post={ this.state.post } comments={ this.state.comments } handleSubmit={ this.handleSubmit } />
    }

    return (
      <div className="container-fluid">
        { postForm }
      </div>
    )
  }
}

export default PostDetail
