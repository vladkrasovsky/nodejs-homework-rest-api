const express = require('express')

const { users: ctrl } = require('../../controllers')

const { validateBody } = require('../../middlewares')

const { schemas } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrl.registerUser
)

router.post('/login', validateBody(schemas.loginSchema), ctrl.loginUser)

module.exports = router
