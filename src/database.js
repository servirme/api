const Sequelize = require('sequelize')

const {
  DATABASE_DATABASE,
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
} = process.env

const operators = Sequelize.Op

const sequelizeConfig = {
  database: DATABASE_DATABASE,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
  logging: false,
  operatorsAliases: operators,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
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
module.exports.Operators = operators
