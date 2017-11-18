const Model = require('./Model')
const EstabilishmentRepository = require('../Repositories/EstabilishmentRepository')
const EstabilishmentTransform = require('../Transforms/EstabilishmentTransform')

class EstabilishmentModel extends Model {
  constructor() {
    super()
    this.repository = new EstabilishmentRepository()
    this.transform = new EstabilishmentTransform()
  }

  createEstabilishment(estabilishmentData) {
    const transformed = this.transformInput(estabilishmentData)

    return this.repository.create(transformed)
  }

  updateEstabilishment(estabilishmentId, estabilishmentData) {
    const transformed = this.transformOutput(estabilishmentData)

    return this.repository.update({
      id: estabilishmentId,
    }, transformed)
  }
}

module.exports = EstabilishmentModel
