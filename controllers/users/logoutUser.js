const { User } = require('../../models/user')

const logoutUser = async (req, res, next) => {
  const { _id } = req.user

  await User.findByIdAndUpdate(_id, { token: '' })

  res.sendStatus(204)
}

module.exports = logoutUser
