const InternalException = require('../../Exceptions/InternalException')
const initializeSequelize = require('./sequelize')
const { DATABASE } = require('../../../config/constants')

const connections = {}

const TYPE = {
  MASTER: 'master',
  CLIENT: 'client',
}

const getDatabaseName = (type, clientId) => {
  if (type === TYPE.MASTER) {
    return DATABASE.MASTER
  }

  if (!clientId) {
    throw new InternalException(`Database type '${type}' without ${clientId}`)
  }

  return DATABASE.CLIENT_PREFIX + clientId
}

const getConnection = (type, clientId) => {
  const database = getDatabaseName(type, clientId)
  if (!connections[database]) {
    connections[database] = initializeSequelize(database)
  }

  return connections[database]
}

module.exports.TYPE = TYPE
module.exports.getConnection = getConnection
