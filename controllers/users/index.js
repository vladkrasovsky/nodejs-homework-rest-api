const { ctrlWrapper } = require('../../helpers')

const registerUser = require('./registerUser')
const loginUser = require('./loginUser')
const logoutUser = require('./logoutUser')
const verifyUser = require('./verifyUser')
const getCurrentUser = require('./getCurrentUser')
const updateUserSubscription = require('./updateUserSubscription')
const updateUserAvatar = require('./updateUserAvatar')

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  verifyUser: ctrlWrapper(verifyUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
}
