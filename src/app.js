require('./global-setup')
const express = require('express')
const cors = require('cors')
const { json } = require('body-parser')
const compression = require('compression')

const {
  i18nMiddleware,
  errorHandler,
  requestMetadata,
} = require('./middlewares/index')
const appGenericRoutes = require('./routes/otherRoutes')
const appRoutes = require('./routes/appRoutes')
require('../config/logger')

const app = express()

app.disable('x-powered-by')

app.use(i18nMiddleware)
app.use(cors())
app.use(json())
app.use(compression())

app.use(requestMetadata)

app.use(appGenericRoutes)
app.use(appRoutes)

app.all('*', () => ({
  statusCode: 404,
  body: {
    message: 'url-not-found',
  },
}))

app.use(errorHandler)

module.exports = app
