import React, { Component, PropTypes } from 'react'

class CommentListItem extends Component {
  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
  }

  onDelete(e) {
    this.props.handleDelete(e, this.props.comment)
  }

  render() {
    const date = new Date(this.props.comment.createdAt)
    const dateTimeString = date.toDateString() + ' ' + date.toTimeString()
    return (
      <div className="row">
        <div className="col-xs-12">
          {this.props.comment.text}
          <br />
          von { this.props.comment.name } ({ dateTimeString })
          <br/>
          <button className="btn btn-danger" type="button" onClick={ this.onDelete }>Löschen</button>
        </div>
      </div>
    )
  }
}

CommentListItem.propTypes = {
  'comment': PropTypes.object.isRequired,
  'handleDelete': PropTypes.func.isRequired
}

export default CommentListItem
