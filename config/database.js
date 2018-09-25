require('../dotenv')

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
  DATABASE_DATABASE,
} = process.env

const config = {
  seederStorage: 'sequelize',
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
  database: DATABASE_DATABASE,
}

module.exports = {
  development: config,
  test: config,
  production: config,
}
