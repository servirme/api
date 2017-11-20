Error.stackTraceLimit = Infinity

class Exception extends Error {
  constructor(httpCode = 500, code, message) {
    super(message)
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
