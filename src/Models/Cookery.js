const cookeryTransform = require('../transforms/cookery')
const CookeryRepository = require('../Repositories/Cookery')

class CookeryModel {
  constructor({
    cookeryRepository = new CookeryRepository(),
  } = {}) {
    this.cookeryRepository = cookeryRepository
  }

  list() {
    return this.cookeryRepository.paginate()
      .map(cookeryTransform.output)
  }

  show(id) {
    return this.cookeryRepository.getOneById(id)
      .then(cookeryTransform.output)
  }
}

module.exports = CookeryModel
