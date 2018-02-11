require('./dotenv').config()
const log4js = require('log4js')
const app = require('./src/app')

const logger = log4js.getLogger('api')

const PORT = 3000

app.listen(PORT, () => {
  logger.info(`Server is running in port ${PORT}`)
})
