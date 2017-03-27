import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { db } from 'baqend'

import {
  fetchPost,
  fetchComments,
  updatePost,
  uploadPostImage,
  uploadPostPreviewImage,
  deletePostImage,
  deletePostPreviewImage
} from '../../actions'

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

    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleUploadImage = this.handleUploadImage.bind(this)
    this.handleUploadPreview = this.handleUploadPreview.bind(this)

    this.handleDeleteImage = this.handleDeleteImage.bind(this)
    this.handleDeletePreview = this.handleDeletePreview.bind(this)
  }

  componentDidMount() {
    this.props.fetchPost(this.props.params.slug)
      .then(post => {
        return this.props.fetchComments(post)
      })
  }

  handleUploadImage(event) {
    this.props.uploadPostImage(this.props.post, event.target.files[0])
  }

  handleUploadPreview(event) {
   this.props.uploadPostPreviewImage(this.props.post, event.target.files[0])
  }

  handleDeletePreview(event) {
    event.preventDefault()

    this.props.deletePostPreviewImage(this.props.post)
  }

  handleDeleteImage(event, image) {
    event.preventDefault()

    this.props.deletePostImage(this.props.post, image)
  }

  handleSubmit(event, formData, tags) {
    event.preventDefault()

    this.props.updatePost(this.props.post, formData, tags)
  }

  render() {
    let postForm, commentList, imageList, previewImage

    if (this.props.post) {
      let tags = this.props.post.tags ? this.props.post.tags : new db.Set()
      postForm = <PostForm post={ this.props.post } defaultTags={ this.props.tags } tags={tags} handleSubmit={ this.handleSubmit } />

      if (this.props.post.images) {
        imageList = this.props.post.images.map((image) => {
          return <ImageListItem image={ image } key={ image.id } handleDelete={ this.handleDeleteImage } />
        })
      }

      if (this.props.post.preview_image) {
        previewImage = <ImageListItem image={ this.props.post.preview_image } handleDelete={ this.handleDeletePreview } />
      } else {
        previewImage = <ImageUploader handleFile={ this.handleUploadPreview } />
      }
    }
    if (this.props.comments.length) {
      commentList = <CommentList comments={ this.props.comments } />
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

export default connect(
  (state) => {
    console.log(state)
    return {
      post: state.post,
      comments: state.comments,
      tags: state.tags
    }
  },
  {
    fetchPost,
    fetchComments,
    updatePost,
    uploadPostImage,
    uploadPostPreviewImage,
    deletePostImage,
    deletePostPreviewImage
  }
)(PostDetail)
