import React, { Component } from 'react'

import LoadingOverlay from './shared/LoadingLayer'

class App extends Component {
  render() {
    return (
      <div className="App">
        { this.props.children }

        <LoadingOverlay />

      </div>
    )
  }
}

export default App
