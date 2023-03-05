const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const { validateBody, isValidId } = require('../../middlewares')

const { schemas } = require('../../models/contact')

const router = express.Router()

router.get('/', ctrl.getAllContacts)

router.get('/:id', isValidId, ctrl.getContactById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.put(
  '/:id',
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
)

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateContactFavorite
)

router.delete('/:id', isValidId, ctrl.deleteContactById)

module.exports = router
