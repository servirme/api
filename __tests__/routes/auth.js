const testServer = require('../testServer')

describe('Auth routes', () => {
  const email = `email${Math.random()}@servir.me`

  test('Should successfully sign up', () => {
    return testServer
      .post('/auth/sign-up')
      .send({
        email,
        password: '123456',
      })
      .expect(201)
  })

  test('Should successfully sign in', () => {
    return testServer
      .post('/auth/sign-in')
      .send({
        email,
        password: '123456',
      })
      .expect(200)
  })

  describe('Trying to register an existing email', () => {
    test('Should successfully sign up', () => {
      return testServer
        .post('/auth/sign-up')
        .send({
          email,
          password: '123456',
        })
        .expect(409)
    })
  })

  test('Should not successfully sign up', () => {
    return testServer
      .post('/auth/sign-up')
      .send({
        email: 'not_email',
        password: '123456',
      })
      .expect(422)
  })

  describe('Should not successfully sign in', () => {
    test('Due to not found email', () => {
      return testServer
        .post('/auth/sign-in')
        .send({
          email: 'another.email@example.com',
          password: '123456',
        })
        .expect(404)
    })

    test('Due to wrong password', () => {
      return testServer
        .post('/auth/sign-in')
        .send({
          email,
          password: '1234567',
        })
        .expect(400)
    })
  })
})
