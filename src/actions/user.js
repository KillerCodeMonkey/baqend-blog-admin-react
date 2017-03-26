import { db } from 'baqend'

export const LOGGED_IN = 'LOGGED_IN'
function loggedIn(user) {
  return {
    type: LOGGED_IN,
    user
  }
}
export function login(login, password) {
  return (dispatch, getState) => {
    return db.User.login(login, password).then(() => dispatch(loggedIn(db.User.me)))
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
