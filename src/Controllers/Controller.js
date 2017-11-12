const BbPromise = require('bluebird')
const { view, lensPath, set } = require('ramda')

const Exception = require('../Exceptions/Exception')
const InternalException = require('../Exceptions/InternalException')
const InvalidException = require('../Exceptions/InvalidException')
const I18n = require('../Services/I18n')

class Controller {
  constructor() {
    this._i18n = I18n.getInstance()
  }

  _useValidator(Validator) {
    this.validator = new Validator()
    return this
  }

  lambdaWrapper(actionName) {
    return (event, context, callback) => {
      console.time('Request')
      context.callbackWaitsForEmptyEventLoop = false

      const rawReq = {
        headers: event.headers || {},
        queryString: event.queryStringParameters || {},
        path: event.pathParameters || {},
        body: event.body || '{}',
      }

      return BbPromise.resolve(rawReq)
        .then((req) => {
          this._selectedLanguage = rawReq.headers['Accept-Language'] || I18n.validLocales[0]

          try {
            req.body = JSON.parse(req.body)
          } catch (jsonParseException) {
            throw new InvalidException('body')
          }

          if (this.validator) {
            return this.validator.validate(actionName, req)
          }
          return req
        })
        .then((reqValidated) => {
          const bindedAction = this[actionName].bind(this)
          return bindedAction(reqValidated)
        })
        .then((response) => {
          const body = response.body || response
          const statusCode = response.statusCode
          const headers = response.headers
          const translate = response.translate

          return this.response(body, statusCode, headers, translate)
        })
        .catch(Exception, (err) => {
          return this.response(err.getBody(), err.getHttpCode(), {}, err.getTranslateKeys())
        })
        .catch((err) => {
          const error = new InternalException(err)
          return this.response(error.getBody(), error.getHttpCode(), {}, error.getTranslateKeys())
        })
        .then((response) => {
          console.timeEnd('Request')
          callback(null, response)
        })
    }
  }

  response(body, statusCode = 200, headers = {}, translate = []) {
    headers['Content-Type'] = 'application/json'
    translate.push('message')

    this._i18n.setLocale(this._selectedLanguage)

    const bodyTranslated = translate.reduce((oldBody, keyToTranslate) => {
      const keyTranslatePath = keyToTranslate.split('.')
      const path = lensPath(keyTranslatePath)

      const value = view(path, oldBody)
      const translated = this._i18n.translate(value)

      return set(path, translated, oldBody)
    }, body)

    return {
      statusCode,
      headers,
      body: JSON.stringify(bodyTranslated),
    }
  }
}

module.exports = Controller
