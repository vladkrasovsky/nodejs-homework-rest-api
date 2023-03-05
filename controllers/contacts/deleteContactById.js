const { Contact } = require('../../models/contact')

const { HttpError } = require('../../helpers')

const deleteContactById = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user

  const result = await Contact.findOneAndRemove({ id, owner })

  if (!result) {
    throw HttpError(404, 'Not found')
  }

  res.json({ message: 'contact deleted' })
}

module.exports = deleteContactById
