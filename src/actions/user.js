import { db, binding } from 'baqend'

import { isLoading, isNotLoading } from './loading'

export const LOGGED_IN = 'LOGGED_IN'
function loggedIn(user) {
  return {
    type: LOGGED_IN,
    user
  }
}
export function login(login, password) {
  return (dispatch, getState) => {
    dispatch(isLoading())

    return db.User
      .login(login, password)
      .then(() => { 
        dispatch(isNotLoading())
        dispatch(loggedIn(new binding.Entity(db.User.me)))

        return
      })
      .catch(() => dispatch(isNotLoading()))
  }
}

export const LOGGED_OUT = 'LOGGED_OUT'
function loggedOut() {
  return {
    type: LOGGED_OUT,
    user: null
  }
}
export function logout() {
  return (dispatch, getState) => {
    dispatch(isLoading())

    return db.User
      .logout()
      .then(() => {
        dispatch(isNotLoading())
        dispatch(loggedOut())

        return
      })
      .catch(() => dispatch(isNotLoading()))
  }
}

export const SET_USER = 'SET_USER'
export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}
