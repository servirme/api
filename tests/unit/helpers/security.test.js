const security = require('../../../src/helpers/security')

describe('Security', () => {
  const password = '123456'
  const passwordHash = '$2a$10$7LvUnAKx7AobYS7dYN4ceu9Wsd/d/N93Jwp4ex/sCPYulgXeKmuBW'

  test('hashPassword', () => {
    const hashedPasswordPromise = security.hashPassword(password)
    return expect(hashedPasswordPromise).resolves.toEqual(passwordHash)
  })

  test('checkPassword', () => {
    const checkPasswordPromise = security.checkHashPassword(
      password,
      passwordHash
    )

    return expect(checkPasswordPromise).resolves.toEqual(true)
  })
})
