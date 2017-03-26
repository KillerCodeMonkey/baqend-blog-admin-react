import React, { Component } from 'react'

import TagListItem from './TagListItem'
import TagService from '../../shared/TagService'

class TagList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      newTag: {
        alias: null,
        name: null
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    TagService.get().then(tags => {
      this.setState({ tags: tags })
    })
  }

  handleCreate(event) {
    event.preventDefault()

    if (!this.state.newTag.name) {
      return
    }

    TagService
      .create(this.state.newTag)
      .then(tags => {
        this.setState({
          tags: tags,
          newTag: {
            alias: null,
            name: null
          }
        })
        this.nameInput.value = ''
        this.aliasInput.value = ''
      })
  }

  handleDelete(event, tag) {
    event.preventDefault()

    TagService
      .delete(tag)
      .then(tags => {
        this.setState({
          tags: tags
        })
      })
  }

  handleChange(event) {
    const input = event.target
    let changes = Object.assign({}, this.state.newTag, { [input.name]: input.value })

    this.setState({
      newTag: changes
    })
  }

  handleEdit(event, tag, formData) {
    event.preventDefault()

    TagService
      .update(tag, formData)
      .then(tags => {
        this.setState({
          tags: tags
        })
      })
  }

  render() {
    let tagRows

    if (this.state.tags.length) {
      tagRows = this.state.tags.map((tag) => {
        return <TagListItem tag={ tag } handleDelete={ this.handleDelete } handleEdit={ this.handleEdit } key={ tag.id } />
      })
    }

    return (
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Alias</th>
            </tr>
          </thead>
          <tbody>
            { tagRows }
            <tr>
              <td>
                <input
                  type="text"
                  ref={ el => this.nameInput = el }
                  className="form-control"
                  name="name"
                  onChange={ this.handleChange }
                />
              </td>
              <td>
                <input
                  type="text"
                  ref={ el => this.aliasInput = el }
                  className="form-control"
                  name="alias"
                  onChange={ this.handleChange } />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={ this.handleCreate }
                >
                  Hinzufügen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TagList
