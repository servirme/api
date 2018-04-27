require('../dotenv')
const util = require('util')
const { exec } = require('child_process')
const log4js = require('log4js')

require('../config/logger')
const { DATABASE } = require('../config/constants')

const logger = log4js.getLogger('database')
const execPromise = util.promisify(exec)

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env

const addEnvironment = (name, value) => {
  return `${name}=${value}`
}

const environments = [
  addEnvironment('PGHOST', DATABASE_HOST),
  addEnvironment('PGUSER', DATABASE_USERNAME),
  addEnvironment('PGPASSWORD', DATABASE_PASSWORD),
].join(' ')

const pgdumpCommand = `${environments} pg_dump --schema='${DATABASE.BASE_CLIENT}' servirme`
const psqlCommand = `${environments} psql -d servirme`

module.exports = (establishmentId) => {
  const newDatabaseName = DATABASE.CLIENT_PREFIX + establishmentId
  const replaceDatabaseName = `sed 's/${DATABASE.BASE_CLIENT}/${newDatabaseName}/g'`

  const command = `${pgdumpCommand} | ${replaceDatabaseName} | ${psqlCommand}`
  return execPromise(command)
    .then(({ stderr }) => {
      if (stderr) {
        logger.error(`Failed to create database for #${establishmentId}`, {
          err: stderr,
        })
        throw new Error(`Failed to create database for #${establishmentId}`)
      }
    })
}
