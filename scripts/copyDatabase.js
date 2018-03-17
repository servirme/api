require('../dotenv').config()
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

if (!DATABASE_HOST || !DATABASE_USERNAME || !DATABASE_PASSWORD) {
  throw new Error('Missing some config data')
}

process.env.PGHOST = DATABASE_HOST
process.env.PGUSER = DATABASE_USERNAME
process.env.PGPASSWORD = DATABASE_PASSWORD

const pgdumpCommand = `pg_dump --schema='${DATABASE.BASE_CLIENT}' servirme`
const psqlCommand = 'psql -d servirme'
const clone = (establishmentId) => {
  const newDatabaseName = `servirme_${establishmentId}`
  const replaceDatabaseName = `sed 's/${DATABASE.BASE_CLIENT}/${newDatabaseName}/g'`

  const command = `${pgdumpCommand} | ${replaceDatabaseName} | ${psqlCommand}`
  return execPromise(command)
    .then(({ stderr }) => {
      if (stderr) {
        logger.error(`Failed to create database for #${establishmentId}`, {
          err: stderr,
        })
        throw new Error('Failed to create database')
      }
    })
}

module.exports = clone
