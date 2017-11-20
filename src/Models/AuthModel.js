const BbPromise = require('bluebird')
const Model = require('./Model')
const EstabilishmentModel = require('./EstabilishmentModel')
const UserModel = require('./UserModel')

class AuthModel extends Model {
  constructor() {
    super()
    this.estabilishmentModel = new EstabilishmentModel()
    this.userModel = new UserModel()
  }

  signIn({ estabilishment, user }) {
    return BbPromise.all(
      this.estabilishmentModel.createEstabilishment(estabilishment),
      this.userModel.createUser(user)
    )
      .then(([, userCreated]) => {
        return userCreated
      })
  }
}

module.exports = AuthModel
