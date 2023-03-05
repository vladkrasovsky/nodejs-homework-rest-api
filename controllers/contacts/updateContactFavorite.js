const { Contact } = require('../../models/contact')

const { HttpError } = require('../../helpers')

const updateContactFavorite = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user

  const result = await Contact.findOneAndUpdate({ id, owner }, req.body, {
    new: true,
  })

  if (!result) {
    throw HttpError(404, 'Not found')
  }

  res.json(result)
}

module.exports = updateContactFavorite
