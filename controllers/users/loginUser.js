const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../models/user')

const { HttpError } = require('../../helpers')

const { SECRET_KEY } = process.env

const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  const error = HttpError(401, 'Email or password is wrong')

  if (!user) {
    throw error
  }

  const passwordCompare = await bcrypt.compare(password, user.password)

  if (!passwordCompare) {
    throw error
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
  await User.findByIdAndUpdate(user._id, { token })

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

module.exports = loginUser
