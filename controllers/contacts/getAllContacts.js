const { Contact } = require('../../models/contact')

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user
  const { skip, limit } = req.pagination

  const match = { owner }
  const filters = req.query

  if (filters.favorite) {
    match.favorite = filters.favorite === 'true'
  }

  const result = await Contact.find(match, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription')

  res.json(result)
}

module.exports = getAllContacts
