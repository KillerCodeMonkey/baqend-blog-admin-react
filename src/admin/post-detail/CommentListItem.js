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
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="well well-lg">{this.props.comment.text}</div>
        </div>
        <div className="panel-footer clearfix">
          <div className="pull-left">von { this.props.comment.name } ({ dateTimeString })</div>
          <div className="pull-right">
            <button className="btn btn-danger" type="button" onClick={ this.onDelete }>Löschen</button>
          </div>
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
