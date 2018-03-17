const log4js = require('log4js')

const logger = log4js.getLogger('api')

Error.stackTraceLimit = Infinity

class Exception extends Error {
  constructor(httpCode = 500, code, message) {
    super(message)

    if (!code) {
      logger.error(`Error message '${message}' does not have a code: ${code}`)
    }

    this._translateKeys = []

    this._httpCode = httpCode
    this._body = {
      code,
      message,
    }
  }

  addTranslateKey(key) {
    this._translateKeys.push(key)
  }

  getBody() {
    return this._body
  }

  getTranslateKeys() {
    return this._translateKeys
  }

  getHttpCode() {
    return this._httpCode
  }
}

module.exports = Exception
