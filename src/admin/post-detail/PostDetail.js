import React, { Component } from 'react'

import { db } from 'baqend'

import PostForm from '../../shared/PostForm'
import CommentList from './CommentList'

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
        return db.Comment.find().in('id', Array.from(post.comments)).resultList()
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
    let postForm, commentList
    if (this.state.post) {
      postForm = <PostForm post={ this.state.post } handleSubmit={ this.handleSubmit } />
    }
    if (this.state.comments.length) {
      commentList = <CommentList comments={ this.state.comments } />
    }

    return (
      <div className="container-fluid">
        { postForm }

        { commentList }
      </div>
    )
  }
}

export default PostDetail
