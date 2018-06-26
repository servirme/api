const testServer = require('../testServer')

describe('General routes', () => {
  test('/status route', () => testServer
    .get('/status')
    .expect(200))

  test('/robots.txt route', () => testServer
    .get('/robots.txt')
    .expect('content-type', 'text/plain; charset=utf-8')
    .expect(200))

  test('Should hit 404 route', () => testServer
    .get('/random/123')
    .expect(404))

  test('Should receive error 400 with invalid body error', () => testServer
    .post('/auth/register')
    .type('json')
    .send('{ "email": "matheus@servir.me" ')
    .expect(400, {
      code: 1301,
      message: 'invalid.body',
    }))
})
