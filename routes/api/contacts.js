const express = require('express')
const Joi = require('joi')

const contacts = require('../../models/contacts')

const { HttpError } = require('../../helpers')

const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
    if (!result) {
      next()
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, 'missing fields')
    }
    const { error } = schema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
      return next()
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
      return next()
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
