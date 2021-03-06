import React, { Component, PropTypes } from 'react'

import { db } from 'baqend'

import PostService from '../../shared/PostService'
import CommentService from '../../shared/CommentService'

import PostForm from '../../shared/PostForm'
import CommentList from './CommentList'

class ImageListItem extends Component {
  render() {
    return (
      <ul className="media-list">
        <li className="media">
          <div className="media-left">
            <img className="media-object img-responsive img-thumbnail" src={this.props.image.url} alt="Beitragsbild" style={{ width: '250px' }} />
          </div>
          <div className="media-body">
            <h4 className="media-heading">Bild</h4>
            <div className="form-group">
              <input type="text" readOnly value={'![Bild](' + this.props.image.url + ')'} className="form-control" />
            </div>
            <button className="btn btn-danger" onClick={ e => this.props.handleDelete(e, this.props.image) }>entfernen</button>
          </div>
        </li>
      </ul>
    )
  }
}
ImageListItem.propTypes = {
  image: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

class ImageUploader extends Component {
  render() {
    return (
      <div className="form-group">
        <input className="form-control" type="file" onChange={ this.props.handleFile } />
      </div>
    )
  }
}
ImageUploader.propTypes = {
  handleFile: PropTypes.func.isRequired
}

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      comments: [],
      loading: true
    }

    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleUploadImage = this.handleUploadImage.bind(this)
    this.handleUploadPreview = this.handleUploadPreview.bind(this)

    this.handleDeleteImage = this.handleDeleteImage.bind(this)
    this.handleDeletePreview = this.handleDeletePreview.bind(this)
  }

  componentDidMount() {
    PostService.getBySlug(this.props.params.slug)
      .then(post => {
        this.post = post

        this.setState({
          post: post,
          loading: false
        })
        return CommentService.getForPost(post)
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

  handleUploadImage(event) {
    PostService
      .uploadImage(this.post, event.target.files[0])
      .then((post) => {
        this.setState({
          post: post
        })
      })
  }

  handleUploadPreview(event) {
    PostService
      .uploadPreviewImage(this.post, event.target.files[0])
      .then((post) => {
        this.setState({
          post: post
        })
      })
  }

  handleDeletePreview(event) {
    event.preventDefault()

    PostService.deletePreview(this.post)
      .then((post) => {
        this.post = post

        this.setState({
          post: this.post
        })
      })
  }

  handleDeleteImage(event, image) {
    event.preventDefault()

    PostService
      .deleteImage(this.post, image)
      .then((post) => {
        this.post = post

        this.setState({
          post: this.post
        })
      })
  }

  handleSubmit(event, formData, tags) {
    event.preventDefault()

    PostService
      .update(this.post, formData, tags)
      .then((post) => {
        this.post = post

        this.setState({
          post: post
        })
      })
  }

  render() {
    let postForm, commentList, imageList, previewImage
    if (this.state.post) {
      let tags = this.state.post.tags ? this.state.post.tags : new db.Set()
      postForm = <PostForm post={ this.state.post } tags={tags} handleSubmit={ this.handleSubmit } />

      if (this.state.post.images) {
        imageList = this.state.post.images.map((image) => {
          return <ImageListItem image={ image } key={ image.id } handleDelete={ this.handleDeleteImage } />
        })
      }

      if (this.state.post.preview_image) {
        previewImage = <ImageListItem image={ this.state.post.preview_image } handleDelete={ this.handleDeletePreview } />
      } else {
        previewImage = <ImageUploader handleFile={ this.handleUploadPreview } />
      }
    }
    if (this.state.comments.length) {
      commentList = <CommentList comments={ this.state.comments } />
    }

    return (
      <div className="container-fluid">
        <h3>Allgemeine Einstellungen</h3>
        { postForm }

        <h3>Vorschaubild</h3>
        { previewImage }

        <div className="">
          <h3>Bilder</h3>
          { imageList }
          <ImageUploader handleFile={ this.handleUploadImage } />
        </div>

        <h3>Kommentare</h3>
        { commentList }
      </div>
    )
  }
}

export default PostDetail
