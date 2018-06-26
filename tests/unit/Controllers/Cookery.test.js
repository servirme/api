const { assert, stub } = require('sinon')

const CookeryController = require('../../../src/Controllers/Cookery')

class CookeryModelFake {
  constructor() {
    this.list = stub().returns([{ fake: 'list' }])
    this.show = stub().returns({ fake: 'cookery' })
  }
}

describe('CookeryController', () => {
  let controller

  beforeAll(() => {
    controller = new CookeryController({
      CookeryModel: CookeryModelFake,
    })
  })

  test('constructor', () => {
    expect(controller.cookeryModel instanceof CookeryModelFake).toBe(true)
  })

  describe('index', () => {
    let response

    beforeAll(async () => {
      response = await controller.index()
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.cookeryModel.list)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'cookeries.list',
          result: [{ fake: 'list' }],
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
      assert.calledOnce(controller.cookeryModel.show)
      assert.calledWithExactly(controller.cookeryModel.show, req.params.id)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'cookeries.show',
          result: { fake: 'cookery' },
        },
      })
    })
  })
})
