const Jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')

const { User } = require('../../models/user')

const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars')

const updateUserAvatar = async (req, res) => {
  const { path: tempUpload } = req.file

  const avatarImg = await Jimp.read(tempUpload)
  avatarImg.resize(250, 250).quality(85).write(tempUpload)

  const { _id } = req.user
  const filename = `${_id}.${avatarImg.getExtension()}`
  const resultUpload = path.join(avatarsDir, filename)

  await fs.rename(tempUpload, resultUpload)

  const avatarURL = path.join('avatars', filename)
  await User.findByIdAndUpdate(_id, { avatarURL })

  res.json({
    avatarURL,
  })
}

module.exports = updateUserAvatar
