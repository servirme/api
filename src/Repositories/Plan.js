const BaseRepository = require('./BaseRepository')
const { DATABASE } = require('../../config/constants')

class PlanRepository extends BaseRepository {
  paginate() {
    return this.database.master.plan
      .findAll({}, { searchPath: DATABASE.MASTER })
  }

  getOneById(id) {
    return this.database.master.plan
      .findById(id, { searchPath: DATABASE.MASTER })
  }
}

module.exports = PlanRepository

