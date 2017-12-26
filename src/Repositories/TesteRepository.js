const { database, getClientDatabase } = require('../Helpers/database')

module.exports.getOne = (estabilishmentId) => {
  return database.client.entity
    .findAll({
      where: {
        id: 1,
      },
    }, {
      searchPath: getClientDatabase(estabilishmentId),
    })
}
