import React, { Component, PropTypes } from 'react'
import { className } from 'react-dom'

class FlashMessage extends Component {
  render() {
    return (
      <div className={ this.props['flash-style'] ? "alert alert-" + this.props['flash-style'] : 'alert' } role="alert">
        { this.props['flash-message'] }
      </div>
    )
  }
}

FlashMessage.propTypes = {
  'flash-message': PropTypes.string.isRequired,
  'flash-style': PropTypes.string
}

export default FlashMessage
