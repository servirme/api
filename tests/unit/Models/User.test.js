const { assert, stub } = require('sinon')

const UserModel = require('../../../src/Models/User')

const conflictError = new Error('conflict error')
const getByEmailResponse = 'some user'

class UserRepositoryFake {
  constructor() {
    const createUserFake = stub().callsFake((shouldConflict) => {
      if (shouldConflict.email === 'conflict') {
        throw conflictError
      }
      return 'createUser return'
    })

    this.createUser = createUserFake
    this.getByEmail = stub().returns(getByEmailResponse)
  }
}

const hashPasswordFake = stub().returns('fake password hashed')
const checkConflictFake = stub().returns('conflict confirmed')
const checkExistsFake = stub()

describe('UserModel', () => {
  let model

  beforeAll(() => {
    model = new UserModel({
      userRepository: new UserRepositoryFake(),
      hashPassword: hashPasswordFake,
      checkConflict: checkConflictFake,
      checkExists: checkExistsFake,
    })
  })

  test('constructor', () => {
    expect(model.userRepository instanceof UserRepositoryFake).toBe(true)
    expect(model.hashPassword).toEqual(hashPasswordFake)
    expect(model.checkConflict).toEqual(checkConflictFake)
    expect(model.checkExists).toEqual(checkExistsFake)
  })

  describe('createUser', () => {
    describe('normal flow', () => {
      const user = {
        email: 'example@servir.me',
        password: '123456',
      }
      let returnValue

      beforeAll(async () => {
        returnValue = await model.createUser(user)
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(model.hashPassword)
        assert.calledWithExactly(model.hashPassword, user.password)

        assert.calledOnce(model.userRepository.createUser)
        assert.calledWithExactly(model.userRepository.createUser, {
          email: user.email,
          password: 'fake password hashed',
        })
      })

      test('should return correct value', () => {
        expect(returnValue).toEqual('createUser return')
      })
    })

    describe('with user conflict', () => {
      const user = {
        email: 'conflict',
        password: '123456',
      }
      let returnValue

      beforeAll(async () => {
        returnValue = await model.createUser(user)
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(model.checkConflict)
        assert.calledWithExactly(model.checkConflict, 'user', conflictError)
      })

      test('should return correct value', () => {
        expect(returnValue).toEqual('conflict confirmed')
      })
    })
  })

  describe('getByEmail', () => {
    const email = 'example@servir.me'
    let returnValue

    beforeAll(async () => {
      returnValue = await model.getByEmail(email)
    })

    test('should call correct methods with correct arguments', () => {
      assert.calledOnce(model.userRepository.getByEmail)
      assert.calledWithExactly(model.userRepository.getByEmail, email)

      assert.calledOnce(model.checkExists)
      assert.calledWithExactly(model.checkExists, 'user', getByEmailResponse)
    })

    test('should return correct value', () => {
      expect(returnValue).toEqual(getByEmailResponse)
    })
  })
})
