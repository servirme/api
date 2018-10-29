const Sequelize = require('sequelize')
const log4js = require('log4js')

const { isProd } = require('../config/env')

const {
  DATABASE_DATABASE,
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_LOGGING,
} = process.env
const logger = log4js.getLogger('database')

const logging = (isProd || DATABASE_LOGGING === 'true') && logger.debug.bind(logger)

const sequelizeConfig = {
  database: DATABASE_DATABASE,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
  logging,
  operatorsAliases: Sequelize.Op,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  benchmark: true,
  pool: {
    handleDisconnects: true,
    idle: 60000,
    acquire: 20000,
  },
  dialectOptions: {
    prependSearchPath: true,
  },
}

const sequelize = new Sequelize(sequelizeConfig)

module.exports = sequelize
