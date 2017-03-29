import React from 'react'
import ReactDOM from 'react-dom'

import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect
} from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import { db } from 'baqend'

import * as APP_REDUCERS from './reducers'

import { fetchTags, setUser } from './actions'

import App from './App'
import Login from './login/Login'

import Admin from './admin/Admin'
import PostList from './admin/post-list/PostList'
import PostNew from './admin/post-new/PostNew'
import PostDetail from './admin/post-detail/PostDetail'
import TagList from './admin/tag-list/TagList'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer,
    ...APP_REDUCERS
  }),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const isLoggedIn = (nextState, replace, callback) => {
  if (store.getState().user) {
    replace({
      pathname: '/admin'
    })
  }
  callback()
}

const isNotLoggedIn = (nextState, replace, callback) => {
  if (!store.getState().user) {
    replace({
      pathname: '/login'
    })
  }
  store.dispatch(fetchTags()).then(() => callback())
}

const connectToDb = (_nextState, _replace, callback) => {
  if (db.isReady && db.isOpen) {
    store.dispatch(setUser(db.User.me))
    return callback()
  }
  db.connect('blog').then(() => {
    store.dispatch(setUser(db.User.me))
    callback()
  })
}

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App } onEnter={ connectToDb }>
        <IndexRoute component={ Login }  onEnter={ isLoggedIn } />
        <Route path="login" component={ Login } onEnter={ isLoggedIn } />
        <Route path="admin" component={ Admin } onEnter={ isNotLoggedIn } >
          <IndexRoute component={ PostList } />
          <Route path="posts/new" component={ PostNew } />
          <Route path="posts/:slug" component={ PostDetail } />
          <Route path="posts" component={ PostList } />
          <Route path="tags" component={ TagList } />
        </Route>
      </Route>
      <Redirect from="*" to="/login" />
    </Router>
  </Provider>,
  document.getElementById('mount')
)
