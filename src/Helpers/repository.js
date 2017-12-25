const { getConnection, TYPE } = require('./database/index')

module.exports.getMasterConnection = () => {
  return getConnection(TYPE.MASTER)
}

module.exports.getClientConnection = (estabilishmentId) => {
  return getConnection(TYPE.CLIENT, estabilishmentId)
}
