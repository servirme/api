const i18nMiddleware = require('./i18n')
const errorHandler = require('./errorHandler')
const apiLogger = require('./apiLogger')
const requestMetadata = require('./requestMetadata')
const auth = require('./auth')

module.exports = {
  i18nMiddleware,
  errorHandler,
  apiLogger,
  requestMetadata,
  anyAuth: auth.any,
  clientAuth: auth.client,
  adminAuth: auth.admin,
  masterAuth: auth.master,
}
