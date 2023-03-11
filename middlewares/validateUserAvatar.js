const Jimp = require('jimp')
const fs = require('fs/promises')

const { HttpError } = require('../helpers')

const allowedMimeTypes = [Jimp.MIME_PNG, Jimp.MIME_JPEG]

const validateUserAvatar = async (req, res, next) => {
  if (!req.file || req.file.fieldname !== 'avatar') {
    next(HttpError(400, 'Avatar is missing'))
  }

  const { path: tempUpload, mimetype } = req.file

  if (!allowedMimeTypes.includes(mimetype)) {
    await fs.unlink(tempUpload)
    next(HttpError(400, `Avatar image has unsupported mimetype: ${mimetype}`))
  }

  next()
}

module.exports = validateUserAvatar
