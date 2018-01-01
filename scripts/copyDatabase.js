// TODO - agora o banco está em postgres, tem q ver se ainda funciona
// https://stackoverflow.com/questions/18216462/how-to-duplicate-schemas-in-postgresql
// TODO - tem que testar isso certinho e ver se várias execuções em paralelo não caga

require('dotenv').config()
const util = require('util')
const { exec } = require('child_process')
const log4js = require('log4js')
require('../config/logger')

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

const BASE_DATABASE = 'servirme'
const connect = `-port=3306 -u ${DATABASE_USERNAME} -h ${DATABASE_HOST} -p${DATABASE_PASSWORD}`
const mysqldumpCommand = `mysqldump ${connect} ${BASE_DATABASE}`

const clone = (estabilishmentId) => {
  const newDatabaseName = `servirme_${estabilishmentId}`

  const createDatabase = `CREATE DATABASE \`${newDatabaseName}\`;`

  const mysqlCommandCreateDatabase = `echo '${createDatabase}' | mysql ${connect}`
  const mysqlCommandCopyDatabase = `${mysqldumpCommand} | mysql ${connect} ${newDatabaseName}`

  return execPromise(`${mysqlCommandCreateDatabase}; ${mysqlCommandCopyDatabase}`)
    .then(({ stderr }) => {
      if (stderr) {
        logger.error(`Failed to create database for #${estabilishmentId}`, {
          err: stderr,
        })
        throw new Error('Failed to create database')
      }
    })
}

module.exports = clone
