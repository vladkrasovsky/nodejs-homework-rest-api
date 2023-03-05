const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseError } = require('../helpers')

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const subscriptionList = ['starter', 'pro', 'business']

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: String,
    default: '',
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionList),
  token: Joi.string(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
})

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
}
