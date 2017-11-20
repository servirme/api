const { path } = require('ramda')
const NotAuthorizedException = require('../../Exceptions/NotAuthorizedException')

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
  PUBLIC: 'public',
  PRIVATE: 'admin',
}

module.exports.validate = (req, mode) => {
  const token = getApiToken(req)

  if (!token) {
    throw new NotAuthorizedException('empty-token')
  }

  const decoded = decode(token)
  const { type } = decoded

  if (type !== MODES.PRIVATE && type !== mode) {
    throw new NotAuthorizedException('not-authorized')
  }

  req.auth = decoded

  return req
}

module.exports.MODES = MODES
