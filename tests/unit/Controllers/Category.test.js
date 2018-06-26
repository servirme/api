const { assert, stub } = require('sinon')

const CategoryController = require('../../../src/Controllers/Category')

class CategoryModelFake {
  constructor() {
    this.list = stub().returns([{ fake: 'list' }])
    this.show = stub().returns({ fake: 'category' })
  }
}

describe('CategoryController', () => {
  let controller

  beforeAll(() => {
    controller = new CategoryController({
      CategoryModel: CategoryModelFake,
    })
  })

  test('constructor', () => {
    expect(controller.categoryModel instanceof CategoryModelFake).toBe(true)
  })

  describe('index', () => {
    let response

    beforeAll(async () => {
      response = await controller.index()
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.categoryModel.list)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'categories.list',
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
      assert.calledOnce(controller.categoryModel.show)
      assert.calledWithExactly(controller.categoryModel.show, req.params.id)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'categories.show',
          result: { fake: 'category' },
        },
      })
    })
  })
})
