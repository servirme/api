const CookeryModel = require('../Models/Cookery')

class CookeryController {
  constructor({
    CookeryModel: CookeryModelDep = CookeryModel,
  } = {}) {
    this.cookeryModel = new CookeryModelDep()

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
  }

  async index() {
    const cookeries = await this.cookeryModel.list()

    return {
      statusCode: 200,
      body: {
        message: 'cookeries.list',
        result: cookeries,
      },
    }
  }

  async show({ params }) {
    const { id } = params

    const cookery = await this.cookeryModel.show(id)

    return {
      statusCode: 200,
      body: {
        message: 'cookeries.show',
        result: cookery,
      },
    }
  }
}

module.exports = CookeryController

