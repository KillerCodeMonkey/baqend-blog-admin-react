import React, { Component } from 'react'

import {
  browserHistory,
  IndexRoute,
  Router,
  Redirect,
  Route
} from 'react-router'

import { db } from 'baqend'

import App from './App'
import AppData from './shared/AppData'
import Login from './login/Login'

import Admin from './admin/Admin'
import PostList from './admin/post-list/PostList'
import PostDetail from './admin/post-detail/PostDetail'

class Root extends Component {
  constructor(props) {
    super(props)
    this.connectToDb = this.connectToDb.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.isNotLoggedIn = this.isNotLoggedIn.bind(this)
  }

  isLoggedIn(nextState, replace, callback) {
    db.ready().then(() => {
      if (db.User.me) {
        replace({
          pathname: '/admin/posts'
        })
      }
      callback()
    })
  }

  isNotLoggedIn(nextState, replace, callback) {
    db.ready()
      .then(() => {
        if (!db.User.me) {
          replace({
            pathname: '/login'
          })
        }
        return db.Tag.find().resultList()
      })
      .then((tags) => {
        AppData.tags = tags
        callback()
      })
  }

  connectToDb(_nextState, _replace, callback) {
    db.connect('blog').then(() => {
      callback()
    })
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route path="/" component={App} onEnter={this.connectToDb}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} onEnter={this.isLoggedIn} />
            <Route path="admin" component={Admin} onEnter={this.isNotLoggedIn} >
              <IndexRoute component={PostList} />
              <Route path="post-detail/:slug" component={PostDetail} />
              <Route path="posts" component={PostList} />
            </Route>
          </Route>
          <Redirect from="*" to="/login" />
        </div>
      </Router>
    )
  }
}

export default Root
