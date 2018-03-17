const { path } = require('ramda')
const jwt = require('../helpers/jwt')
const NotAuthorizedError = require('../Errors/NotAuthorized')
const ForbiddenError = require('../Errors/Forbidden')
const { AUTH } = require('../../config/constants')

const { HEADER, LEVELS } = AUTH

const getApiToken = path(['headers', HEADER])
const decode = (token) => {
  return jwt.verify(token)
}

const getMiddleware = (mode) => {
  return (req, res, next) => {
    const token = getApiToken(req)

    if (!token) {
      throw new NotAuthorizedError('empty-token')
    }

    const decoded = decode(token)
    const { type } = decoded

    if (mode && type !== mode) {
      throw new ForbiddenError('jwt')
    }

    req.auth = decoded

    next()
  }
}

module.exports.client = getMiddleware(LEVELS.CLIENT)
module.exports.admin = getMiddleware(LEVELS.ADMIN)
module.exports.master = getMiddleware(LEVELS.MASTER)
module.exports.any = getMiddleware()
