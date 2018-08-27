const { models } = require('./base')

module.exports.linkUserAndEstablishment = (
  userId,
  establishmentId
) => models.master.establishmentUser.create({
  user_id: userId,
  establishment_id: establishmentId,
})

module.exports.getEstablishmentsFromUser = userId => models.master
  .establishmentUser
  .find({ where: { user_id: userId } })
