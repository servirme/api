const Model = require('./Model')
const TesteRepository = require('../Repositories/TesteRepository')

class TesteModel extends Model {
  constructor() {
    super()
    this.repository = TesteRepository
  }

  getTeste(estabilishmentId) {
    return this.repository.getOne(estabilishmentId)
  }
}

module.exports = TesteModel
