const TesteModel = require('../Models/TesteModel')

class UserController {
  constructor() {
    this.model = new TesteModel()
  }

  test() {
    return this.model.getTeste(2)
      .then(teste => ({
        statusCode: 201,
        body: {
          message: 'estabilishment.created',
          result: teste,
        },
      }))
  }
}

module.exports = UserController
