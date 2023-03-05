const pagination = async (req, res, next) => {
  // const { page = 1, limit = 20 } = req.query
  const page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 20

  if (limit > 50) {
    limit = 50
  }

  const skip = (page - 1) * limit

  req.pagination = {
    skip,
    limit,
  }

  next()
}

module.exports = pagination
