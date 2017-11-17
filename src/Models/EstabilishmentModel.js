const EstabilishmentRepository = require('../Repositories/EstabilishmentRepository')
const EstabilishmentTransform = require('../Transforms/EstabilishmentTransform')

class EstabilishmentModel {
  constructor() {
    this.repository = new EstabilishmentRepository()
    this.transform = new EstabilishmentTransform()
  }

  createEstabilishment(estabilishmentData) {
    const transformed = this.transform.transform(estabilishmentData, 'create')

    return this.repository.create(transformed)
  }

  updateEstabilishment(estabilishmentId, estabilishmentData) {
    const transformed = this.transform.transform(estabilishmentData, 'update')

    return this.repository.update({ id: estabilishmentId }, transformed)
  }
}

module.exports = EstabilishmentModel
