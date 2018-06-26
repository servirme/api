const { assert, stub } = require('sinon')

const EstablishmentController = require('../../../src/Controllers/Establishment')

class EstablishmentModelFake {
  constructor() {
    this.createEstablishment = stub().returns({ fake: 'establishment' })
    this.updateEstablishment = stub().returns({ fake: 'establishment' })
    this.showEstablishment = stub().returns({ fake: 'establishment' })
  }
}

describe('EstablishmentController', () => {
  let controller

  beforeAll(() => {
    controller = new EstablishmentController({
      EstablishmentModel: EstablishmentModelFake,
    })
  })

  test('constructor', () => {
    const { establishmentModel } = controller
    expect(establishmentModel instanceof EstablishmentModelFake).toBe(true)
  })

  describe('create', () => {
    const req = {
      auth: {
        user: { id: 1 },
      },
      body: { fake: 'data' },
    }
    let response

    beforeAll(async () => {
      response = await controller.create(req)
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.establishmentModel.createEstablishment)
      assert.calledWithExactly(
        controller.establishmentModel.createEstablishment,
        req.body,
        req.auth.user.id
      )
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 201,
        body: {
          message: 'establishment.created',
          result: { fake: 'establishment' },
        },
      })
    })
  })

  describe('update', () => {
    const req = {
      params: { id: 1 },
      body: { fake: 'data' },
    }
    let response

    beforeAll(async () => {
      response = await controller.update(req)
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.establishmentModel.updateEstablishment)
      assert.calledWithExactly(
        controller.establishmentModel.updateEstablishment,
        req.params.id,
        req.body
      )
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'establishment.updated',
          result: { fake: 'establishment' },
        },
      })
    })
  })

  describe('show', () => {
    const req = {
      params: { id: 1 },
    }
    let response

    beforeAll(async () => {
      response = await controller.show(req)
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.establishmentModel.showEstablishment)
      assert.calledWithExactly(
        controller.establishmentModel.showEstablishment,
        req.params.id
      )
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'establishment.show',
          result: { fake: 'establishment' },
        },
      })
    })
  })
})
