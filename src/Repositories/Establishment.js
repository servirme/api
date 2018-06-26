const BaseRepository = require('./BaseRepository')
const { DATABASE } = require('../../config/constants')

class EstablishmentRepository extends BaseRepository {
  getOne(id) {
    return this.database.master.establishment
      .findById(id, { searchPath: DATABASE.MASTER })
  }

  create(data) {
    return this.database.master.establishment
      .create(data)
  }

  async update(id, data) {
    const resource = await this.getOne(id)

    return resource.updateAttributes(data)
  }

  static activate(establishment) {
    return establishment.updateAttributes({ active: true })
  }
}

module.exports = EstablishmentRepository
