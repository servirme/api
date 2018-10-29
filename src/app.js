require('./setup')
const express = require('express')
const cors = require('cors')
const { json } = require('body-parser')
const compression = require('compression')

const {
  i18nMiddleware,
  errorHandler,
  requestMetadata,
} = require('./middlewares/index')
const { wrapAction } = require('./helpers/express')
const appGenericRoutes = require('./routes/otherRoutes')
const appRoutes = require('./routes/appRoutes')
const NotFoundError = require('./Errors/NotFound')

const app = express()

app.disable('x-powered-by')

app.use(i18nMiddleware)
app.use(cors())
app.use(json())
app.use(compression())

app.use(requestMetadata)

app.use(appGenericRoutes)
app.use(appRoutes)

const notFoundResponse = () => {
  throw new NotFoundError('url')
}

app.all('*', wrapAction(notFoundResponse))

app.use(errorHandler)

module.exports = app
