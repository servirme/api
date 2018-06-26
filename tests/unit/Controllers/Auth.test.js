const { assert, stub } = require('sinon')

const AuthController = require('../../../src/Controllers/Auth')

const fakeRemoveJwtFields = stub().returns({ removed: true })
class AuthModelFake {
  constructor() {
    this.signIn = stub().returns('fake token')
    this.signUp = stub().returns('fake token')
    this.sign = stub().returns('fake token')
  }
}

describe('AuthController', () => {
  let controller

  beforeAll(() => {
    controller = new AuthController({
      AuthModel: AuthModelFake,
      removeJwtFields: fakeRemoveJwtFields,
    })
  })

  test('constructor', () => {
    expect(controller.authModel instanceof AuthModelFake).toBe(true)
  })

  describe('login', () => {
    const req = {
      body: { fake: 'data' },
    }
    let response

    beforeAll(async () => {
      response = await controller.login(req)
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.authModel.signIn)
      assert.calledWithExactly(controller.authModel.signIn, req.body)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'signed.in',
          token: 'fake token',
        },
      })
    })
  })

  describe('register', () => {
    const req = {
      body: { fake: 'data' },
    }
    let response

    beforeAll(async () => {
      response = await controller.register(req)
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(controller.authModel.signUp)
      assert.calledWithExactly(controller.authModel.signUp, req.body)
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 201,
        body: {
          message: 'signed.up',
          token: 'fake token',
        },
      })
    })
  })

  describe('refreshToken', () => {
    const req = {
      auth: { fake: 'data' },
    }
    let response

    beforeAll(async () => {
      response = await controller.refreshToken(req)
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(fakeRemoveJwtFields)
      assert.calledWithExactly(fakeRemoveJwtFields, req.auth)

      assert.calledOnce(controller.authModel.sign)
      assert.calledWithExactly(controller.authModel.sign, {
        removed: true,
      })
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'token.refresh',
          token: 'fake token',
        },
      })
    })
  })

  describe('check', () => {
    let response

    beforeAll(async () => {
      response = await AuthController.check()
    })

    test('should return correct response', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'token.ok',
        },
      })
    })
  })
})
