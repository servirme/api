const InvalidError = require('../Errors/Invalid')
const establishmentTransform = require('../transforms/establishment')
const EstablishmentRepository = require('../Repositories/Establishment')
const EstablishmentUserRepository = require('../Repositories/EstablishmentUser')
// const copyDatabase = require('../../scripts/copyDatabase')
const { checkConflict, checkExists } = require('../helpers/model')

// const createEstablishmentDatabaseSchema = establishment =>
//   copyDatabase(establishment.id)

class EstablishmentModel {
  constructor({
    transform = establishmentTransform,
    establishmentRepository = new EstablishmentRepository(),
    establishmentUserRepository = new EstablishmentUserRepository(),
    checkExists: checkExistsDep = checkExists,
  } = {}) {
    this.establishmentTransform = transform
    this.establishmentRepository = establishmentRepository
    this.establishmentUserRepository = establishmentUserRepository
    this.checkExists = checkExistsDep
  }

  async validateOneEstablishmentPerUser(userId) {
    const establishments = await this.establishmentUserRepository
      .getEstablishmentsFromUser(userId)

    if (establishments && establishments.length) {
      throw new InvalidError('user-establishment')
    }
  }

  async createEstablishment(establishmentData, userId) {
    try {
      await this.validateOneEstablishmentPerUser(userId)

      const establishmentInput = await this.establishmentTransform.input(
        establishmentData
      )

      const establishmentCreated = await this.establishmentRepository.create(
        establishmentInput
      )

      await this.establishmentUserRepository.linkUserAndEstablishment(
        userId,
        establishmentCreated.id
      )

      // await createEstablishmentDatabaseSchema(establishmentCreated)

      await EstablishmentRepository.activate(establishmentCreated)

      return this.establishmentTransform.output(establishmentCreated)
    } catch (error) {
      return checkConflict('establishment', error)
    }
  }

  updateEstablishment(id, establishmentData) {
    const transformed = this.establishmentTransform.input(establishmentData)

    return this.establishmentRepository.update(id, transformed)
      .then(this.establishmentTransform.output)
  }

  async showEstablishment(id) {
    const establishment = await this.establishmentRepository.getOne(id)

    this.checkExists('establishment', establishment)

    return this.establishmentTransform.output(establishment)
  }
}

module.exports = EstablishmentModel
