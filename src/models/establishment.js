const InvalidError = require('../Errors/Invalid')
const establishmentTransform = require('../transforms/establishment')
const establishmentRepository = require('../repositories/establishment')
const establishmentUserRepository = require('../repositories/establishmentUser')
const { checkConflict, checkExists } = require('../helpers/model')

const validateOneEstablishmentPerUser = async (userId) => {
  const establishments = await establishmentUserRepository
    .getEstablishmentsFromUser(userId)

  if (establishments && establishments.length) {
    throw new InvalidError('user-establishment')
  }
}

module.exports.createEstablishment = async (establishmentData, userId) => {
  try {
    await validateOneEstablishmentPerUser(userId)

    const establishmentInput = await establishmentTransform.input(
      establishmentData
    )

    const establishmentCreated = await establishmentRepository.create(
      establishmentInput
    )

    await establishmentUserRepository.linkUserAndEstablishment(
      userId,
      establishmentCreated.id
    )

    await establishmentRepository.activate(establishmentCreated)

    return establishmentTransform.output(establishmentCreated)
  } catch (error) {
    return checkConflict('establishment', error)
  }
}

module.exports.updateEstablishment = (id, establishmentData) => {
  const transformed = establishmentTransform.input(establishmentData)

  return establishmentRepository.update(id, transformed)
    .then(establishmentTransform.output)
}

module.exports.showEstablishment = async (id) => {
  const establishment = await establishmentRepository.getOne(id)

  checkExists('establishment', establishment)

  return establishmentTransform.output(establishment)
}
