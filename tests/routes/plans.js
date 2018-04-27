const testServer = require('../testServer')

describe('Plans routes', () => {
  test('It should get all plans', () => {
    return testServer
      .get('/plans')
      .expect(200)
  })

  test('It should get plan details', () => {
    return testServer
      .get('/plan/1')
      .expect(200)
  })
})
