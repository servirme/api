const structure = require('../Models/Test')
const SequelizeRepository = require('./SequelizeRepository')

class UserRepository extends SequelizeRepository {
  constructor() {
    super(structure)
  }
}

module.exports = UserRepository
