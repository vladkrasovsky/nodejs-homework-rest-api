const express = require('express')

const { users: ctrl } = require('../../controllers')

const {
  authenticate,
  upload,
  validateBody,
  validateUserAvatar,
} = require('../../middlewares')

const { schemas } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrl.registerUser
)

router.post('/login', validateBody(schemas.loginSchema), ctrl.loginUser)

router.get('/verify/:verificationToken', ctrl.verifyUser)

router.get('/current', authenticate, ctrl.getCurrentUser)

router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateUserSubscription
)

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  validateUserAvatar,
  ctrl.updateUserAvatar
)

router.post('/logout', authenticate, ctrl.logoutUser)

module.exports = router
