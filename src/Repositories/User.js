const BaseRepository = require('./BaseRepository')

class UserRepository extends BaseRepository {
  createUser({ email, password }) {
    return this.database.master.user
      .create({
        email,
        password,
      })
  }

  getByEmail(email) {
    return this.database.master.user
      .findOne({
        where: {
          email,
        },
      })
  }
}

module.exports = UserRepository
