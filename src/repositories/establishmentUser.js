const { models } = require('./base')

module.exports.linkUserAndEstablishment = (
  userId,
  establishmentId
) => models.EstablishmentUser.create({
  user_id: userId,
  establishment_id: establishmentId,
})

module.exports.getEstablishmentsFromUser = userId => models.EstablishmentUser
  .find({ where: { user_id: userId } })
