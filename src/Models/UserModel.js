const Model = require('./Model')
const UserRepository = require('../Repositories/UserRepository')
const UserTransform = require('../Transforms/UserTransform')

class UserModel extends Model {
  constructor() {
    super()
    this.repository = new UserRepository()
    this.transform = new UserTransform()
  }

  createUser(user) {
    const transformed = this.transformInput(user)

    return this.repository.create(transformed)
      .then(this.transformOutput.bind(this))
  }

  showUser(id) {
    const condition = { id }

    return this.repository.getOne(condition)
      .then(this.transformOutput.bind(this))
  }
}

module.exports = UserModel
