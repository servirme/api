const structure = require('../Entities/Estabilishment')
const SequelizeRepository = require('./SequelizeRepository')

class EstabilishmentRepository extends SequelizeRepository {
  constructor() {
    super(structure)
  }
}

module.exports = EstabilishmentRepository
