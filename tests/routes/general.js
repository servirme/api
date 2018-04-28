const testServer = require('../testServer')

describe('General routes', () => {
  test('/status route', () => {
    return testServer
      .get('/status')
      .expect(200)
  })

  test('/robots.txt route', () => {
    return testServer
      .get('/robots.txt')
      .expect('content-type', 'text/plain; charset=utf-8')
      .expect(200)
  })

  test('Should hit 404 route', () => {
    return testServer
      .get('/random/123')
      .expect(404)
  })

  test('Should receive error 400 with invalid body error', () => {
    return testServer
      .post('/auth/register')
      .type('json')
      .send('{ "email": "matheusvellone@hotmail.com" ')
      .expect(400, {
        code: 1301,
        message: 'invalid.body',
      })
  })
})
