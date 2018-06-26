const { assert, stub } = require('sinon')

const PlanController = require('../../../src/Controllers/Plan')

class PlanModelFake {
  constructor() {
    this.list = stub().returns([{ fake: 'list' }])
    this.show = stub().returns({ fake: 'plan' })
  }
}

describe('PlanController', () => {
  let controller

  beforeAll(() => {
    controller = new PlanController({
      PlanModel: PlanModelFake,
    })
  })

  test('constructor', () => {
    expect(controller.planModel instanceof PlanModelFake).toBe(true)
  })

  describe('index', () => {
    let response

    beforeAll(async () => {
      response = await controller.index()
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.planModel.list)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'plans.list',
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
      assert.calledOnce(controller.planModel.show)
      assert.calledWithExactly(controller.planModel.show, req.params.id)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'plans.show',
          result: { fake: 'plan' },
        },
      })
    })
  })
})
