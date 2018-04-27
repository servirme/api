const InvalidError = require('../Errors/Invalid')
const establishmentTransform = require('../transforms/establishment')
const {
  activate: activateEstablishment,
  create: createEstablishment,
  update: updateEstablishment,
  getOne: getOneEstablishment,
} = require('../repositories/establishment')
const {
  linkUserAndEstablishment,
  getEstablishmentsFromUser,
} = require('../repositories/establishment-user')
// const copyDatabase = require('../../scripts/copyDatabase')
const { checkConflict } = require('../helpers/model')

// const createEstablishmentDatabaseSchema = establishment =>
//   copyDatabase(establishment.id)

module.exports.createEstablishment = (establishmentData, userId) => {
  const linkEstablishmentToUser = ({ id: establishmentId }) => {
    return linkUserAndEstablishment(userId, establishmentId)
  }

  const validateOneEstablishmentPerUser = () => {
    return getEstablishmentsFromUser(userId)
      .tap((establishments) => {
        if (establishments && establishments.length) {
          throw new InvalidError('user-establishment')
        }
      })
  }

  return Promise.resolve(establishmentData)
    .tap(validateOneEstablishmentPerUser)
    .then(establishmentTransform.input)
    .then(createEstablishment)
    .tap(linkEstablishmentToUser)
    // .tap(createEstablishmentDatabaseSchema)
    .tap(activateEstablishment)
    .then(establishmentTransform.output)
    .catch(checkConflict('establishment'))
}

module.exports.updateEstablishment = (id, establishmentData) => {
  const transformed = establishmentTransform.input(establishmentData)

  return updateEstablishment(id, transformed)
    .then(establishmentTransform.output)
}

module.exports.showEstablishment = (id) => {
  return getOneEstablishment(id)
    .then(establishmentTransform.output)
}
