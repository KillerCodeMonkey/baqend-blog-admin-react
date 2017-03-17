import React, { Component } from 'react'
import { withRouter, IndexLink, Link } from 'react-router'

import { db } from 'baqend'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.user = db.User.me
  }

  logout() {
    db.User.logout().then(() => {
      this.props.router.push('/login')
    })
  }

  render() {
    return (
      <div className="Admin">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Anja's Blog :)</a>
            </div>
            <div>
              <ul className="nav navbar-nav">
                <li>
                  <IndexLink to="/admin">Beiträge</IndexLink>
                </li>
                <li>
                  <Link to="/tags">Tags</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={this.logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <br />
        <div className="container">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default withRouter(Admin)
