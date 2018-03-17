const BaseError = require('../Errors/BaseError')
const InternalError = require('../Errors/Internal')
const InvalidError = require('../Errors/Invalid')

const normalizeError = (err, requestId) => {
  if (err instanceof BaseError) {
    return err
  }

  if (err.type === 'entity.parse.failed') {
    return new InvalidError('body')
  }

  return new InternalError(err, requestId)
}

module.exports = (err, req, res, next) => {
  const error = normalizeError(err, req.requestId)

  error.getTranslateKeys().forEach(res.translate)

  res
    .status(error.getHttpCode())
    .send(error.getBody())
  next()
}
