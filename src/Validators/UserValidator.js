const Joi = require('joi')
const Validator = require('./Validator')

const User = (create) => {
  const name = Joi.string()
  const email = Joi.string().email()

  return Joi.object({
    name: Validator.getRule(name, create),
    email: Validator.getRule(email, create),
  })
}

class UserValidator extends Validator {
  constructor() {
    super()

    this.addValidator('create', {
      body: User(true).required(),
    })
  }
}

UserValidator.User = User

module.exports = UserValidator
