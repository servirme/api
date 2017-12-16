const { path } = require('ramda')
const NotAuthorizedException = require('../Exceptions/NotAuthorizedException')

const getApiToken = path(['headers', 'token'])
const decode = (token) => {
  try {
    // TODO - use JWT
    return JSON.parse(token)
  } catch (a) {
    throw new NotAuthorizedException('invalid-token')
  }
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

    if (type !== mode) {
      throw new NotAuthorizedException('not-authorized')
    }

    req.auth = decoded

    next()
  }
}

module.exports.client = getMiddleware(MODES.CLIENT)
module.exports.admin = getMiddleware(MODES.ADMIN)
module.exports.master = getMiddleware(MODES.MASTER)
