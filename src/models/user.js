const { pluck } = require('ramda')

const userRepository = require('../repositories/user')
const establishmentRepository = require('../repositories/establishment')
const establishmentUserRepository = require('../repositories/establishmentUser')
const establishmentTransform = require('../transforms/establishment')
const { hashPassword } = require('../helpers/security')
const { checkConflict, checkExists } = require('../helpers/model')

module.exports.createUser = async ({ email, password }) => {
  try {
    const hashedPassword = await hashPassword(password)

    return await userRepository.createUser({
      email,
      password: hashedPassword,
    })
  } catch (error) {
    return checkConflict('user', error)
  }
}

module.exports.getByEmail = async (email) => {
  const user = await userRepository.getByEmail(email)

  checkExists('user', user)

  return user
}

module.exports.getEstablishments = async (userId) => {
  const userEstablishments = await establishmentUserRepository
    .getEstablishmentsFromUser(userId)

  const establishmentIds = pluck('establishment_id', userEstablishments)

  const establishments = await establishmentRepository.getIds(establishmentIds)

  const transformedEstablishments = establishments
    .map(establishmentTransform.output)

  return transformedEstablishments
}
