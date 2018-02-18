require('../dotenv').config()
const { DATABASE } = require('./constants')

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
} = process.env

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE.MASTER,
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
  },
  test: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE.MASTER,
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
  },
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE.MASTER,
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
  },
}
