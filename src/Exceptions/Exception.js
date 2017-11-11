Error.stackTraceLimit = Infinity

class Exception extends Error {
  /**
   * @param {number} httpCode
   * @param {number} code
   * @param {string} message
   */
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

  /**
   * @return {object}
   */
  getBody() {
    return this._body
  }

  getTranslateKeys() {
    return this._translateKeys
  }

  /**
   * @return {number}
   */
  getHttpCode() {
    return this._httpCode
  }

  getCallbackPayload() {
    return {
      statusCode: this.getHttpCode(),
      body: this.getBody(),
    }
  }
}

module.exports = Exception
