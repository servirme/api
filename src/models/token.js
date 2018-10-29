const { models } = require('./database')
const { removeJwtFields, sign } = require('../helpers/jwt')

module.exports.sign = (payload) => {
  const rawPayload = removeJwtFields(payload)

  return sign(rawPayload)
}

module.exports.get = id => models.Token.findById(id)

module.exports.invalidate = id => models.Token.destroy({ where: { id } })
