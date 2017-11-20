const structure = require('../Entities/User')
const SequelizeRepository = require('./SequelizeRepository')

class UserRepository extends SequelizeRepository {
  constructor() {
    super(structure)
  }
}

module.exports = UserRepository
