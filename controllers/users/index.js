const { ctrlWrapper } = require('../../helpers')

const registerUser = require('./registerUser')
const loginUser = require('./loginUser')
const logoutUser = require('./logoutUser')
const getCurrentUser = require('./getCurrentUser')

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
}
