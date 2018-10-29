const testServer = require('../testServer')

describe('Auth routes', () => {
  const email = `email${Math.random()}@servir.me`

  test('Should successfully sign up', () => testServer
    .post('/auth/register')
    .send({
      email,
      password: '123456',
    })
    .expect(201))

  test('Should successfully sign in', () => testServer
    .post('/auth/login')
    .send({
      email,
      password: '123456',
    })
    .expect(200))
})
