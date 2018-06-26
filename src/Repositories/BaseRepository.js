const { database } = require('../helpers/database')

class BaseRepository {
  constructor({
    db = database,
  } = {}) {
    this.database = db
  }

  getTransaction() {
    return this.database.sequelize.transaction()
  }
}

module.exports = BaseRepository
