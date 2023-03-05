const { Contact } = require('../../models/contact')

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user
  const { skip, limit } = req.pagination

  const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription')

  res.json(result)
}

module.exports = getAllContacts
