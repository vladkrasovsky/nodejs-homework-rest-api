const { User } = require('../../models/user')

const { HttpError } = require('../../helpers')

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true })

  if (!updatedUser) {
    throw HttpError(404, 'Not found')
  }

  const { email, subscription } = updatedUser

  res.json({
    user: {
      email,
      subscription,
    },
  })
}

module.exports = updateUserSubscription
