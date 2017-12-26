const testServer = require('../testServer')

describe('General routes', () => {
  test('/status route', () => {
    return testServer
      .get('/status')
      .expect(200)
  })

  test('Should hit 404 route', () => {
    return testServer
      .get('/random/123')
      .expect(404)
  })
})
