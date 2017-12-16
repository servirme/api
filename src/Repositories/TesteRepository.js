const { getClientConnection } = require('../Helpers/repository')

const getEntity = (estabilishmentId) => {
  return getClientConnection(estabilishmentId).teste
}

module.exports.getOne = (estabilishmentId) => {
  return getEntity(estabilishmentId)
    .findAll({
      where: {
        id: 1,
      },
    })
}
