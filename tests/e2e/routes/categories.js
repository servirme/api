const testServer = require('../testServer')

describe('Categories routes', () => {
  test('It should get all categories', () => testServer
    .get('/categories')
    .expect(200))

  test('It should get category details', () => testServer
    .get('/category/1')
    .expect(200))
})
