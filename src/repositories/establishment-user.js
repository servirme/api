const { database } = require('../helpers/database')

module.exports.linkUserAndEstablishment = (userId, establishmentId) => {
  return database.master.establishmentUser
    .create({
      user_id: userId,
      establishment_id: establishmentId,
    })
}

module.exports.getEstablishmentsFromUser = (userId) => {
  return database.master.establishmentUser
    .find({ where: { user_id: userId } })
}
