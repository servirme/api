const establishmentModel = require('../models/establishment')
const establishmentValidator = require('../validators/establishment')

module.exports.create = (req) => {
  const { body } = establishmentValidator.create(req)
  const { id: userId } = req.auth.user

  return establishmentModel.createEstablishment(body, userId)
    .then(establishment => ({
      statusCode: 201,
      body: {
        message: 'establishment.created',
        result: establishment,
      },
    }))
}

module.exports.update = (req) => {
  const { body, params } = establishmentValidator.update(req)

  return establishmentModel.updateEstablishment(params.id, body)
    .then(establishment => ({
      statusCode: 200,
      body: {
        message: 'establishment.updated',
        result: establishment,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = establishmentValidator.update(req)

  return establishmentModel.showEstablishment(params.id)
    .then(establishment => ({
      statusCode: 200,
      body: {
        message: 'establishment.show',
        result: establishment,
      },
    }))
}

// module.exports.userEstabilishments = (req) => {
//   const { auth } = req

//   return establishmentModel.getUserEstablishment(auth.user.id)
//     .then(establishments => ({
//       statusCode: 200,
//       body: {
//         message: 'establishment.user-list',
//         result: establishments,
//       },
//     }))
// }
