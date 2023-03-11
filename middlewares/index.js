const authenticate = require('./authenticate')
const validateBody = require('./validateBody')
const validateUserAvatar = require('./validateUserAvatar')
const isValidId = require('./isValidId')
const pagination = require('./pagination')
const upload = require('./upload')

module.exports = {
  authenticate,
  validateBody,
  validateUserAvatar,
  isValidId,
  pagination,
  upload,
}
