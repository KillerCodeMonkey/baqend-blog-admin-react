import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoadingOverlay extends Component {
  render() {
    let loading

    if (this.props.loading) {
      loading = <div className="overlay">
                  <div className="spinner">
                  </div>
                </div>
    }

    return (
      <div>
      { loading }
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: state.loading
  })
)(LoadingOverlay)
