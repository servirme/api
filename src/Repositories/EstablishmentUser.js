const BaseRepository = require('./BaseRepository')

class EstablishmentUser extends BaseRepository {
  linkUserAndEstablishment(userId, establishmentId) {
    return this.database.master.establishmentUser
      .create({
        user_id: userId,
        establishment_id: establishmentId,
      })
  }

  getEstablishmentsFromUser(userId) {
    return this.database.master.establishmentUser
      .find({ where: { user_id: userId } })
  }
}

module.exports = EstablishmentUser
