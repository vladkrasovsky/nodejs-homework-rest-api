const jwt = require('jsonwebtoken')

const { User } = require('../models/user')

const { HttpError } = require('../helpers')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [tokenType, token] = authorization.split(' ')

  const error = HttpError(401, 'Not authorized')

  if (tokenType !== 'Bearer') {
    next(error)
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)

    if (!user || !user.token || user.token !== token) {
      next(error)
    }

    req.user = user
    next()
  } catch {
    next(error)
  }
}

module.exports = authenticate
