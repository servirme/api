const InvalidError = require('../Errors/Invalid')
const establishmentTransform = require('../transforms/establishment')
const { models } = require('./database')
const { checkConflict, checkExists } = require('../helpers/model')

const validateOneEstablishmentPerUser = async (userId) => {
  const establishments = await models.EstablishmentUser.findAll({ where: { user_id: userId } })

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

    const establishmentCreated = await models.Establishment.create(establishmentInput)

    await models.EstablishmentUser.create({
      user_id: userId,
      establishment_id: establishmentCreated.id,
    })

    await establishmentCreated.updateAttributes({ active: true })

    return establishmentTransform.output(establishmentCreated)
  } catch (error) {
    return checkConflict('establishment', error)
  }
}

module.exports.updateEstablishment = async (id, establishmentData) => {
  const transformed = establishmentTransform.input(establishmentData)

  const establishment = await models.Establishment.findById(id)

  await establishment.updateAttributes(transformed)

  return establishmentTransform.output(establishment)
}

module.exports.showEstablishment = async (id) => {
  const establishment = await models.Establishment.findById(id)

  checkExists('establishment', establishment)

  return establishmentTransform.output(establishment)
}
