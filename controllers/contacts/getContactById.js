const { Contact } = require('../../models/contact')

const { HttpError } = require('../../helpers')

const getContactById = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user

  const result = await Contact.findOne({ id, owner })

  if (!result) {
    throw HttpError(404, 'Not found')
  }

  res.json(result)
}

module.exports = getContactById
