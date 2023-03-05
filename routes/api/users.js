const express = require('express')

const { users: ctrl } = require('../../controllers')

const { authenticate, validateBody } = require('../../middlewares')

const { schemas } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrl.registerUser
)

router.post('/login', validateBody(schemas.loginSchema), ctrl.loginUser)

router.post('/logout', authenticate, ctrl.logoutUser)

module.exports = router
