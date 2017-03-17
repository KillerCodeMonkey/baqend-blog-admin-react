import React, { Component } from 'react'

import { db } from 'baqend'

import TagListItem from './TagListItem'
import AppData from '../../shared/AppData'

class TagList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: AppData.tags,
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

  handleCreate(event) {
    event.preventDefault()

    if (!this.state.newTag.name || !this.state.newTag.alias) {
      return
    }

    let tag = new db.Tag(this.state.newTag)
    tag
      .save()
      .then((tag) => {
        AppData.tags.push(tag)

        this.setState({
          tags: AppData.tags,
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

    db.ready()
      .then(() => {
        return tag.delete()
      })
      .then(() => {
        const index = AppData.tags.indexOf(tag)
        AppData.tags.splice(index, 1)

        this.setState({
          tags: AppData.tags
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

    const index = AppData.tags.indexOf(tag)
    Object.assign(AppData.tags[index], formData)

    AppData.tags[index]
      .update()
      .then((tag) => {
        this.setState({
          tags: AppData.tags
        })
      })
  }

  render() {
    let tagRows = this.state.tags.map((tag) => {
      return <TagListItem tag={ tag } handleDelete={ this.handleDelete } handleEdit={ this.handleEdit } key={ tag.id } />
    })

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
