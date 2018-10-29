const { pluck } = require('ramda')

const establishmentTransform = require('../transforms/establishment')
const { models, Operators } = require('./database')
const { hashPassword } = require('../helpers/security')
const { checkConflict, checkExists } = require('../helpers/model')

module.exports.createUser = async ({ email, password }) => {
  try {
    const hashedPassword = await hashPassword(password)

    return await models.User.create({
      email,
      password: hashedPassword,
    })
  } catch (error) {
    return checkConflict('user', error)
  }
}

module.exports.getByEmail = async (email) => {
  const user = await models.User.findOne({ where: { email } })

  checkExists('user', user)

  return user
}

module.exports.getEstablishments = async (userId) => {
  const userEstablishments = await models.EstablishmentUser
    .findAll({ where: { user_id: userId } })

  const establishmentIds = pluck('establishment_id', userEstablishments)

  const establishments = await models.Establishment.findAll({
    where: { id: { [Operators.in]: establishmentIds } },
  })

  const transformedEstablishments = establishments
    .map(establishmentTransform.output)

  return transformedEstablishments
}
