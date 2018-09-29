require('../../dotenv')
const log4js = require('log4js')
const app = require('../app')
const { sequelize } = require('../helpers/database')

const logger = log4js.getLogger('api')

const {
  PORT = 3000,
  NODE_ENV,
} = process.env

const validEnvs = [
  'production',
  'development',
  'test',
]
if (!validEnvs.includes(NODE_ENV)) {
  throw new Error(`Incorrect NODE_ENV '${NODE_ENV}'. Possible values are: ${validEnvs.join(', ')}`)
}

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running in '${NODE_ENV}' mode on port ${PORT}`)
    })
  })