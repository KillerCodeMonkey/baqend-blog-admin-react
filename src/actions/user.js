import { db, binding } from 'baqend'

export const LOGGED_IN = 'LOGGED_IN'
function loggedIn(user) {
  return {
    type: LOGGED_IN,
    user
  }
}
export function login(login, password) {
  return (dispatch, getState) => {
    return db.User.login(login, password).then(() => dispatch(loggedIn(new binding.Entity(db.User.me))))
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
    return db.User.logout().then(() => dispatch(loggedOut()))
  }
}

export const SET_USER = 'SET_USER'
export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}
