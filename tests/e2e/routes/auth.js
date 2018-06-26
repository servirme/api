const { AUTH } = require('../../../config/constants')
const testServer = require('../testServer')

describe('Auth routes', () => {
  const email = `email${Math.random()}@servir.me`
  let token

  test('Should successfully sign up', () => {
    return testServer
      .post('/auth/register')
      .send({
        email,
        password: '123456',
      })
      .expect(201)
  })

  test('Should successfully sign in', () => {
    return testServer
      .post('/auth/login')
      .send({
        email,
        password: '123456',
      })
      .expect(200)
      .then(({ body }) => {
        token = body.token
      })
  })

  describe('when waiting 1s', () => {
    beforeAll(() => {
      return Promise.delay(1000)
    })

    test('and refreshing token', () => {
      return testServer
        .get('/auth/refresh')
        .set(AUTH.HEADER, token)
        .expect(200)
        .then(({ body }) => {
          expect(body.token).not.toEqual(token)
        })
    })
  })

  test('Should successfully check token', () => {
    return testServer
      .get('/auth/check')
      .set(AUTH.HEADER, token)
      .expect(200)
  })
})
