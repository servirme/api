const i18nMiddleware = require('./i18n')
const errorHandler = require('./errorHandler')
const apiLogger = require('./apiLogger')
const requestMetadata = require('./requestMetadata')
const auth = require('./auth')
const validate = require('./validator')

module.exports = {
  i18nMiddleware,
  errorHandler,
  apiLogger,
  requestMetadata,
  validate,
  anyAuth: auth.any,
  clientAuth: auth.client,
  adminAuth: auth.admin,
  masterAuth: auth.master,
}
