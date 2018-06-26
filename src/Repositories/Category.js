const BaseRepository = require('./BaseRepository')
const { DATABASE } = require('../../config/constants')

class CategoryRepository extends BaseRepository {
  paginate() {
    return this.database.master.categories
      .findAll({}, {
        searchPath: DATABASE.MASTER,
      })
  }

  getOneById(id) {
    return this.database.master.categories
      .findById(id, {
        searchPath: DATABASE.MASTER,
      })
  }
}

module.exports = CategoryRepository
