import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { db } from 'baqend'

import { createPost } from '../../actions'
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

    this.props
      .createPost(formData, tags)
      .then((post) => this.props.router.push('/admin/posts/' + post.slug))
  }

  render() {
    return (
      <div className="container-fluid">
        <PostForm tags={ new db.Set() }  defaultTags={ this.props.tags } handleSubmit={ this.handleSubmit } />
      </div>
    )
  }
}

export default connect(
  state => ({
    tags: state.tags
  }),
  { createPost }
)(withRouter(PostNew))
