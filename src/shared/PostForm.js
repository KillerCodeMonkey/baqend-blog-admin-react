import React, { Component, PropTypes } from 'react'
import TagService from './TagService'

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
      tags: this.props.tags,
      defaultTags: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleTag = this.toggleTag.bind(this)
  }

  componentDidMount() {
    TagService.get().then(tags => this.setState({ defaultTags: tags }))
  }

  handleChange(event) {
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
    let tagBtns;
    if (this.state.defaultTags.length) {
      tagBtns = this.state.defaultTags.map((tag) => {
        return <TagBtn key={ tag.id } active={this.state.tags.has(tag) ? ' active' : ''} toggleTag={ this.toggleTag } tag={ tag } />
      })
    }

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
          <label htmlFor="publishedAt">Datum</label>
          <input
            type="string"
            name="publishedAt"
            id="publishedAt"
            className="form-control"
            defaultValue={ this.state.post.publishedAt ? this.state.post.publishedAt.toISOString() : '' }
            onChange={ this.handleChange } />
        </div>
        <div className="form-group">
          <label>Tags</label><br/>
          <div className="btn-group" role="group">
            { tagBtns }
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Beschreibung</label>
          <textarea
            name="description"
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
