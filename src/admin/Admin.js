import React, { Component } from 'react'
import { withRouter } from 'react-router'

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
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Anja's Blog :)</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Beiträge <span className="sr-only">(current)</span></a></li>
                <li><a href="#">Tags</a></li>
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
