import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { db } from 'baqend'

import PostService from '../../shared/PostService'
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

    PostService
      .create(formData, tags)
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
