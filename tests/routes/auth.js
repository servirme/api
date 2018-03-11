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

  test('Should successfully refresh token', () => {
    return testServer
      .get('/auth/refresh')
      .set('token', token)
      .expect(200)
      .then(({ body }) => {
        expect(body.token).toEqual(token)
      })
  })

  test('Should when trying to register an existing email', () => {
    return testServer
      .post('/auth/register')
      .send({
        email,
        password: '123456',
      })
      .expect(409)
  })

  test('Should not successfully sign up', () => {
    return testServer
      .post('/auth/register')
      .send({
        email: 'not_email',
        password: '123456',
      })
      .expect(422)
  })

  describe('Should not successfully sign in', () => {
    test('Due to not found email', () => {
      return testServer
        .post('/auth/login')
        .send({
          email: 'another.email@example.com',
          password: '123456',
        })
        .expect(404)
    })

    test('Due to wrong password', () => {
      return testServer
        .post('/auth/login')
        .send({
          email,
          password: '1234567',
        })
        .expect(400)
    })
  })
})
