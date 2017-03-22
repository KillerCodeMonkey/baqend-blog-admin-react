import React, { Component } from 'react'
import { db } from 'baqend'

import FlashMessage from '../shared/FlashMessage'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      login: '',
      error: null,
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.login || !this.state.password) {
      return
    }

    this.setState({
      loading: true
    })

    db.ready()
      .then(() => {
        return db.User.login(this.state.login, this.state.password)
      })
      .then(() => {
        this.setState({
          loading: false
        })
        this.props.router.push('/admin/posts')
      })
      .catch((err) => {
        this.setState({
          error: err,
          loading: false
        })
      })
  }
  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    });
  }

  render() {
    let flashMessage

    if (this.state.error) {
      flashMessage = <FlashMessage flash-style="danger" flash-message={ this.state.error.message } />
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col col-xs-12 col-sm-6">
            <h3>Login</h3>

            { flashMessage }

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="login"
                  name="login"
                  placeholder="username"
                  onChange={ this.handleChange } />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="******"
                  onChange={ this.handleChange } />
              </div>
              <button type="submit" className="btn btn-primary">Go</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
