const testServer = require('./testServer')

describe('General tests', () => {
  test('Should hit 404 route', () => {
    return testServer
      .get('/random/123')
      .expect(404)
  })
})
