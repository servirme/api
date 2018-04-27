const testServer = require('../testServer')

describe('Cookeries routes', () => {
  test('It should get all cookeries', () => {
    return testServer
      .get('/cookeries')
      .expect(200)
  })

  test('It should get cookery details', () => {
    return testServer
      .get('/cookery/1')
      .expect(200)
  })
})
