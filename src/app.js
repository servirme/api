require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { json } = require('body-parser')
const compression = require('compression')

const {
  i18nMiddleware,
  errorHandler,
  apiLogger,
  requestMetadata,
} = require('./Middlewares/index')
const registerRoutes = require('./routes/index')
require('../config/logger')

const app = express()

app.disable('x-powered-by')

app.use(i18nMiddleware)
app.use(cors())
app.use(json())
app.use(compression())

app.use(requestMetadata)
app.use(apiLogger)

registerRoutes(app)

app.all('*', () => {
  return {
    statusCode: 404,
    body: {
      message: 'url-not-found',
    },
  }
})

app.use(errorHandler)

module.exports = app
