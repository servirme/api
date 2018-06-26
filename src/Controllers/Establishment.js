const EstablishmentModel = require('../Models/Establishment')

class EstablishmentController {
  constructor({
    EstablishmentModel: EstablishmentModelDep = EstablishmentModel,
  } = {}) {
    this.establishmentModel = new EstablishmentModelDep()

    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.show = this.show.bind(this)
    // this.userEstablishments = this.userEstablishments.bind(this)
  }

  async create({ body, auth }) {
    const { id: userId } = auth.user

    const establishment = await this.establishmentModel.createEstablishment(
      body,
      userId
    )

    return {
      statusCode: 201,
      body: {
        message: 'establishment.created',
        result: establishment,
      },
    }
  }

  async update({ body, params }) {
    const establishment = await this.establishmentModel.updateEstablishment(
      params.id,
      body
    )

    return {
      statusCode: 200,
      body: {
        message: 'establishment.updated',
        result: establishment,
      },
    }
  }

  async show({ params }) {
    const { id } = params
    const establishment = await this.establishmentModel.showEstablishment(id)

    return {
      statusCode: 200,
      body: {
        message: 'establishment.show',
        result: establishment,
      },
    }
  }

  // userEstabilishments({ auth }) {
  //   return this.establishmentModel.getUserEstablishment(auth.user.id)
  //     .then(establishments => ({
  //       statusCode: 200,
  //       body: {
  //         message: 'establishment.user-list',
  //         result: establishments,
  //       },
  //     }))
  // }
}

module.exports = EstablishmentController

