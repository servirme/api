const testServer = require('../testServer')

describe('Categories routes', () => {
  test('It should get all categories', () => {
    return testServer
      .get('/categories')
      .expect(200)
  })

  test('It should get category details', () => {
    return testServer
      .get('/category/1')
      .expect(200)
  })
})
