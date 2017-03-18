import React, { Component, PropTypes } from 'react'

class TagListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.tag.name,
      alias: this.props.tag.alias
    }
    this.handleChange = this.handleChange.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.tag.name,
      alias: nextProps.tag.alias
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onEdit(event) {
    this.props.handleEdit(event, this.props.tag, {alias: this.state.alias, name: this.state.name})
  }

  onDelete(event) {
    this.props.handleDelete(event, this.props.tag)
  }

  render() {
    return (
      <tr>
        <td>
          <input type="text" className="form-control" name="name" value={ this.state.name } onChange={ this.handleChange }/>
        </td>
        <td>
          <input type="text" className="form-control" name="alias" value={ this.state.alias } onChange={ this.handleChange }/>
        </td>
        <td>
          <button className="btn btn-primary" onClick={ this.onEdit }>
            Speichern
          </button>
          <button className="btn btn-danger" onClick={ this.onDelete }>
            Löschen
          </button>
        </td>
      </tr>
    )
  }
}

TagListItem.propTypes = {
  'tag': PropTypes.object.isRequired,
  'handleEdit': PropTypes.func.isRequired,
  'handleDelete': PropTypes.func.isRequired,
}

export default TagListItem
