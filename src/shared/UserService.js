import { db } from 'baqend'

export default {
  login: (login, password) => {
    return db.User.login(login, password)
  },
  logout: () => {
    return db.User.logout()
  },
  isLoggedIn: () => {
    return db.User.me
  }
}
