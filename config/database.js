require('../dotenv')
const { DATABASE } = require('./constants')

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
} = process.env

const config = {
  seederStorage: 'sequelize',
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE.MASTER,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
}

module.exports = {
  development: config,
  test: config,
  production: config,
}
