const { assert, stub } = require('sinon')

const AuthModel = require('../../../src/Models/Auth')
const { AUTH } = require('../../../config/constants')

class UserModelFake {
  constructor() {
    this.createUser = stub().returns('createUser return')
    this.getByEmail = stub().returns({ password: 'fake password' })
  }
}

const InvalidErrorFake = stub()

const userTransformFake = {
  jwt: stub().returns('jwt transform'),
}

const checkHashPasswordFake = stub().callsFake(payload => payload === 'valid')
const signFake = stub().returns('sign return')

describe('AuthModel', () => {
  let model

  beforeAll(() => {
    model = new AuthModel({
      UserModel: UserModelFake,
      InvalidError: InvalidErrorFake,
      userTransform: userTransformFake,
      checkHashPassword: checkHashPasswordFake,
      sign: signFake,
    })
  })

  test('constructor', () => {
    expect(model.userModel instanceof UserModelFake).toBe(true)
    expect(model.InvalidError).toEqual(InvalidErrorFake)
    expect(model.userTransform).toEqual(userTransformFake)
    expect(model.sign).toEqual(signFake)
    expect(model.checkHashPassword).toEqual(checkHashPasswordFake)
  })

  describe('signUp', () => {
    const credentials = {
      fake: 'credentials',
    }
    let returnValue

    beforeAll(async () => {
      returnValue = await model.signUp(credentials)
    })

    afterAll(() => {
      model.userTransform.jwt.resetHistory()
      model.sign.resetHistory()
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(model.userModel.createUser)
      assert.calledWithExactly(model.userModel.createUser, credentials)

      assert.calledOnce(model.userTransform.jwt)
      assert.calledWithExactly(model.userTransform.jwt, 'createUser return')

      assert.calledOnce(model.sign)
      assert.calledWithExactly(model.sign, {
        type: AUTH.LEVELS.ADMIN,
        user: 'jwt transform',
      })
    })

    test('should return correct value', () => {
      expect(returnValue).toEqual('sign return')
    })
  })

  describe('signIn', () => {
    afterEach(() => {
      model.userModel.getByEmail.resetHistory()
      model.checkHashPassword.resetHistory()
    })

    describe('with valid password', () => {
      const credentials = {
        email: 'fake email',
        password: 'valid',
      }
      let returnValue

      beforeAll(async () => {
        returnValue = await model.signIn(credentials)
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(model.userModel.getByEmail)
        assert.calledWithExactly(model.userModel.getByEmail, 'fake email')

        assert.calledOnce(model.checkHashPassword)
        assert.calledWithExactly(model.checkHashPassword, 'valid', 'fake password')

        assert.calledOnce(model.userTransform.jwt)
        assert.calledWithExactly(model.userTransform.jwt, { password: 'fake password' })

        assert.calledOnce(model.sign)
        assert.calledWithExactly(model.sign, {
          type: AUTH.LEVELS.ADMIN,
          user: 'jwt transform',
        })
      })

      test('should return correct value', () => {
        expect(returnValue).toEqual('sign return')
      })
    })

    describe('with invalid password', () => {
      const credentials = {
        email: 'fake email',
        password: 'invalid',
      }
      let error

      beforeAll(async () => {
        try {
          await model.signIn(credentials)
        } catch (e) {
          error = e
        }
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(model.userModel.getByEmail)
        assert.calledWithExactly(model.userModel.getByEmail, 'fake email')

        assert.calledOnce(model.checkHashPassword)
        assert.calledWithExactly(model.checkHashPassword, 'invalid', 'fake password')
      })

      test('should throw correct error', () => {
        expect(error instanceof InvalidErrorFake).toBe(true)
        assert.calledWithNew(InvalidErrorFake)
        assert.calledWithExactly(InvalidErrorFake, 'password')
      })
    })
  })
})
