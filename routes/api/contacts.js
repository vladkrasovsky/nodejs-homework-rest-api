const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const {
  authenticate,
  validateBody,
  isValidId,
  pagination,
} = require('../../middlewares')

const { schemas } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, pagination, ctrl.getAllContacts)

router.get('/:id', authenticate, isValidId, ctrl.getContactById)

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact)

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
)

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateContactFavorite
)

router.delete('/:id', authenticate, isValidId, ctrl.deleteContactById)

module.exports = router
