import React, { Component, PropTypes } from 'react'
import { className, htmlFor } from 'react-dom'

class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: this.props.post || {},
      form: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let changes = {}
    changes.form = {
      [event.target.name]: event.target.value
    }
    this.setState(changes)
  }
  handleSubmit() {

  }

  render() {
    return (
      <form onSubmit={ e => {
        e.preventDefault()
        this.props.handleSubmit(e, this.state.form)}
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
        {this.state.post.published_at}
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
  'handleSubmit': PropTypes.func.isRequired
}

export default PostForm
