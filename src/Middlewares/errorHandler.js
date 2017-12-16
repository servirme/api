const Exception = require('../Exceptions/Exception')
const InternalException = require('../Exceptions/InternalException')

const normalizeError = (err) => {
  if (err instanceof Exception) {
    return err
  }

  return new InternalException(err)
}

module.exports = (err, req, res, next) => {
  const error = normalizeError(err)

  error.getTranslateKeys().forEach(res.translate)

  res
    .status(error.getHttpCode())
    .send(error.getBody())
  next()
}
