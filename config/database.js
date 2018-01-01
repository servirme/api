const { DATABASE } = require('./constants')

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env

module.exports = {
  development: {
    username: 'database-user',
    password: 'database-password',
    database: DATABASE.MASTER,
    host: 'database',
    dialect: 'postgres',
  },
  test: {
    username: 'database-user',
    password: 'database-password',
    database: DATABASE.MASTER,
    host: 'database',
    dialect: 'postgres',
  },
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE.MASTER,
    host: DATABASE_HOST,
    dialect: 'postgres',
  },
}
