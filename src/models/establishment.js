const InvalidError = require('../Errors/Invalid')
const { generateToken } = require('../models/auth')
const establishmentTransform = require('../transforms/establishment')
const { models } = require('./database')
const { checkConflict, checkExists } = require('../helpers/model')
const { getTransaction } = require('../helpers/database')
const { applyAcl, permissions } = require('../helpers/acl')

const validateOneEstablishmentPerUser = async (userId) => {
  const establishments = await models.EstablishmentUser.findAll({ where: { user_id: userId } })

  if (establishments && establishments.length) {
    throw new InvalidError('user-establishment')
  }
}

const createEstablishment = async (establishmentData, userId) => {
  let transaction

  try {
    await validateOneEstablishmentPerUser(userId)

    const establishmentInput = await establishmentTransform.input(establishmentData)

    transaction = await getTransaction()

    const establishmentCreated = await models.Establishment.create(establishmentInput)

    await models.EstablishmentUser.create({
      user_id: userId,
      establishment_id: establishmentCreated.id,
    })

    await establishmentCreated.updateAttributes({ active: true })

    await transaction.commit()
    return establishmentTransform.output(establishmentCreated)
  } catch (error) {
    await transaction.rollback()
    return checkConflict('establishment', error)
  }
}

const updateEstablishment = async (id, establishmentData) => {
  const transformed = establishmentTransform.input(establishmentData)

  const establishment = await models.Establishment.findById(id)

  await establishment.updateAttributes(transformed)

  return establishmentTransform.output(establishment)
}

const showEstablishment = async (id) => {
  const establishment = await models.Establishment.findById(id)

  checkExists('establishment', establishment)

  return establishmentTransform.output(establishment)
}

const selectEstablishment = async (authData, establishmentId) => {
  const [
    establishment,
    establishmentUser,
  ] = await Promise.all([
    models.Establishment.findById(establishmentId),
    models.EstablishmentUser.findOne({
      where: {
        establishment_id: establishmentId,
        user_id: authData.user.id,
      },
    }),
  ])

  const newTokenData = {
    ...authData,
    establishment,
    establishmentUser,
  }

  return generateToken(newTokenData)
}

module.exports.create = applyAcl(createEstablishment, permissions.ESTABLISHMENT_CREATE)
module.exports.update = applyAcl(updateEstablishment, permissions.ESTABLISHMENT_UPDATE)
module.exports.show = applyAcl(showEstablishment)
module.exports.select = selectEstablishment
