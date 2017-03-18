import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { db } from 'baqend'

import PostForm from '../../shared/PostForm'

class PostNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event, formData, tags) {
    event.preventDefault()
    let post = new db.Post()

    Object.assign(post, formData)
    post.tags = tags

    post
      .save({ refresh: true })
      .then((post) => {
        this.props.router.push('/admin/posts/' + post.slug)
      })
  }

  render() {
    return (
      <div className="container-fluid">
        <PostForm tags={ new db.Set() } handleSubmit={ this.handleSubmit } />
      </div>
    )
  }
}

export default withRouter(PostNew)
