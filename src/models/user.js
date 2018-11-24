const { pluck } = require('ramda')

const establishmentTransform = require('../transforms/establishment')
const { models, Operators } = require('./database')

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
