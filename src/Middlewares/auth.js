const { path } = require('ramda')
const jwt = require('../Helpers/jwt')
const NotAuthorizedException = require('../Exceptions/NotAuthorizedException')
const ForbiddenException = require('../Exceptions/ForbiddenException')

const HEADER_NAME = 'token'

const getApiToken = path(['headers', HEADER_NAME])
const decode = (token) => {
  return jwt.verify(token)
}

const MODES = {
  CLIENT: 'client',
  ADMIN: 'admin',
  MASTER: 'master',
}

const getMiddleware = (mode) => {
  return (req, res, next) => {
    const token = getApiToken(req)

    if (!token) {
      throw new NotAuthorizedException('empty-token')
    }

    const decoded = decode(token)
    const { type } = decoded

    if (mode && type !== mode) {
      throw new ForbiddenException('jwt')
    }

    req.auth = decoded

    next()
  }
}

module.exports.client = getMiddleware(MODES.CLIENT)
module.exports.admin = getMiddleware(MODES.ADMIN)
module.exports.master = getMiddleware(MODES.MASTER)
module.exports.any = getMiddleware()
