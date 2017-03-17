import React, { Component, PropTypes } from 'react'
import AppData from './AppData'

class TagBtn extends Component {
  render() {
    return (
      <div
        role="group"
        className={'btn btn-default' + this.props.active}
        onClick={ e => this.props.toggleTag(e, this.props.tag) }>
        { this.props.tag.name }
      </div>
    )
  }
}

class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: this.props.post || {},
      form: {},
      tags: this.props.tags
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleTag = this.toggleTag.bind(this)
  }

  handleChange(event) {
    let changes = {}
    Object.assign(this.state.form, {
      [event.target.name]: event.target.value
    })
    this.setState({
      form: this.state.form
    })
  }

  toggleTag(event, tag) {
    let tags = this.state.tags

    if (tags.has(tag)) {
      tags.delete(tag)
    } else {
      tags.add(tag)
    }
    Object.assign(this.state.form, {
      tags: tags
    })

    this.setState({
      form: this.state.form
    })
  }

  render() {
     let tagBtns = AppData.tags.map((tag) => {
      return <TagBtn key={ tag.id } active={this.state.tags.has(tag) ? ' active' : ''} toggleTag={ this.toggleTag } tag={ tag } />
    })

    return (
      <form onSubmit={ e => {
        this.props.handleSubmit(e, this.state.form, this.state.tags)}
      }>
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            defaultValue={this.state.post.title}
            placeholder="Titel"
            onChange={ this.handleChange } />
        </div>
        <div className="form-group">
          <label htmlFor="published_at">Datum</label>
          <input
            type="string"
            name="published_at"
            id="published_at"
            className="form-control"
            defaultValue={ (new Date(this.state.post.publishedAt)).toISOString() }
            onChange={ this.handleChange } />
        </div>
        <div className="btn-group" role="group">
          { tagBtns }
        </div>
        <div className="form-group">
          <label htmlFor="description">Beschreibung</label>
          <textarea
            name="text"
            className="form-control"
            rows="3"
            placeholder="Your short description"
            onChange={ this.handleChange }
            defaultValue={ this.state.post.description }>
          </textarea>
        </div>
        <div className="form-group">
          <label htmlFor="text">Text (Markdown)</label>
          <textarea
            name="text"
            className="form-control"
            rows="3"
            placeholder="Your Markdown Content here"
            onChange={ this.handleChange }
            defaultValue={ this.state.post.text }>
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary">Speichern</button>
      </form>
    )
  }
}

PostForm.propTypes = {
  'post': PropTypes.object,
  'tags': PropTypes.object,
  'handleSubmit': PropTypes.func.isRequired
}

export default PostForm
