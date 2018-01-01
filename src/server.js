require('dotenv').config()
const http = require('http')
const log4js = require('log4js')
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

const logger = log4js.getLogger('api')
const app = express()
const PORT = 3000

app.disable('x-powered-by')
app.set('port', PORT)

app.use(cors())
app.use(json())
app.use(compression())

app.use(requestMetadata)
app.use(apiLogger)
app.use(i18nMiddleware)

registerRoutes(app)

app.all('*', (req, res) => {
  res.status(404).send({
    message: 'url-not-found',
  })
})

app.use(errorHandler)

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server is running in port ${PORT}`)
})

module.exports = server
