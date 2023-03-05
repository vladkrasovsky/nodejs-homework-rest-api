const pagination = async (req, res, next) => {
  const { PER_PAGE_LIMIT_DEFAUL = 20, PER_PAGE_LIMIT_MAX = 50 } = process.env

  // const { page = 1, limit = 20 } = req.query
  const page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || PER_PAGE_LIMIT_DEFAUL

  if (limit > PER_PAGE_LIMIT_MAX) {
    limit = PER_PAGE_LIMIT_MAX
  }

  const skip = (page - 1) * limit

  req.pagination = {
    skip,
    limit,
  }

  next()
}

module.exports = pagination
