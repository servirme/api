require('../../dotenv')
const log4js = require('log4js')
const app = require('../app')
const sequelize = require('../database')
const { env } = require('../../config/env')

const logger = log4js.getLogger('api')

const {
  PORT = 3000,
} = process.env

const validEnvs = [
  'production',
  'development',
  'test',
]
if (!validEnvs.includes(env)) {
  throw new Error(`Incorrect environment '${env}'. Possible values are: ${validEnvs.join(', ')}`)
}

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running in '${env}' mode on port ${PORT}`)
    })
  })
