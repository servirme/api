const testServer = require('../testServer')

describe('Cookeries routes', () => {
  test('It should get all cookeries', () => testServer
    .get('/cookeries')
    .expect(200))

  test('It should get cookery details', () => testServer
    .get('/cookery/1')
    .expect(200))
})
