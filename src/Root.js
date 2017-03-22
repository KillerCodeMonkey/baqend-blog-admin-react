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
import TagService from './shared/TagService'
import UserService from './shared/UserService'
import Login from './login/Login'

import Admin from './admin/Admin'
import PostList from './admin/post-list/PostList'
import PostNew from './admin/post-new/PostNew'
import PostDetail from './admin/post-detail/PostDetail'
import TagList from './admin/tag-list/TagList'

class Root extends Component {
  constructor(props) {
    super(props)
    this.connectToDb = this.connectToDb.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.isNotLoggedIn = this.isNotLoggedIn.bind(this)
  }

  isLoggedIn(nextState, replace, callback) {
    if (UserService.isLoggedIn()) {
      replace({
        pathname: '/admin'
      })
    }

    callback()
  }

  isNotLoggedIn(nextState, replace, callback) {
    if (!UserService.isLoggedIn()) {
      replace({
        pathname: '/login'
      })
    }
    TagService.get().then(() => callback())
  }

  connectToDb(_nextState, _replace, callback) {
    if (db.isReady && db.isOpen) {
      return callback()
    }
    db.connect('blog').then(() => {
      callback()
    })
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route path="/" component={ App } onEnter={ this.connectToDb }>
            <IndexRoute component={ Login }  onEnter={ this.isLoggedIn } />
            <Route path="login" component={ Login } onEnter={ this.isLoggedIn } />
            <Route path="admin" component={ Admin } onEnter={ this.isNotLoggedIn } >
              <IndexRoute component={PostList} onEnter={ this.isNotLoggedIn } />
              <Route path="posts/new" component={PostNew} />
              <Route path="posts/:slug" component={PostDetail} />
              <Route path="posts" component={PostList} />
              <Route path="tags" component={TagList} />
            </Route>
          </Route>
          <Redirect from="*" to="/login" />
        </div>
      </Router>
    )
  }
}

export default Root
