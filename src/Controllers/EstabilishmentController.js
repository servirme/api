const Controller = require('./Controller')
const TestRepository = require('../Repositories/TestRepository')
const EstabilishmentValidator = require('../Validators/EstabilishmentValidator')

class UserController extends Controller {
  constructor() {
    super()

    this._repository = new TestRepository()
    this._useValidator(EstabilishmentValidator)
  }

  create(req) {
    const { body } = req

    return this._repository.create(body)
      .then(() => ({
        statusCode: 200,
        body: { message: 'http-500' },
      }))
  }
}

module.exports = UserController
