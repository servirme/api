const Controller = require('./Controller')
const TestRepository = require('../Repositories/TestRepository')

class UserController extends Controller {
  constructor() {
    super()

    this._repository = new TestRepository()
  }

  test(req) {
    const id = Math.floor(Math.random() * 654213)
    return this._repository.create({
      id,
      name: 'matheus',
    })
      .then(() => this._repository.remove({ id: 1 }))
      .then(() => ({
        statusCode: 200,
        body: { message: 'http-500' },
      }))
  }
}

module.exports = UserController
