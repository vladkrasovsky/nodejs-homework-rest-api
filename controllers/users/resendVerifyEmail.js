const { User } = require('../../models/user')

const { HttpError, sendEmail } = require('../../helpers')

const { BASE_URL } = process.env

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw HttpError(400, 'Missing required field email')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw HttpError(404, 'User not found')
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed')
  }

  const verifyEmail = {
    to: user.email,
    subject: 'Please Verify Your Email Identity',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Verify email identity</a>`,
  }

  await sendEmail(verifyEmail)

  res.status(201).json({
    message: 'Verification email sent',
  })
}

module.exports = resendVerifyEmail
