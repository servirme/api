const userModel = require('../models/user')

module.exports.userEstabilishments = async (req) => {
  const userId = req.auth.user.id

  const establishments = await userModel.getEstablishments(userId)

  return {
    statusCode: 200,
    body: {
      message: 'establishment.user-list',
      result: establishments,
    },
  }
}
