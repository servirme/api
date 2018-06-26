const BaseRepository = require('./BaseRepository')
const { DATABASE } = require('../../config/constants')

class CookeryRepository extends BaseRepository {
  paginate() {
    return this.database.master.cookeries
      .findAll({}, {
        searchPath: DATABASE.MASTER,
      })
  }

  getOneById(id) {
    return this.database.master.cookeries
      .findById(id, {
        searchPath: DATABASE.MASTER,
      })
  }
}

module.exports = CookeryRepository
