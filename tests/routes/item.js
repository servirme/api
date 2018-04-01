const { database, getClientDatabase } = require('../../src/helpers/database')
const { AUTH } = require('../../config/constants')
const testServer = require('../testServer')
const { auth } = require('../helpers')

const { admin: adminToken } = auth

describe('Item routes', () => {
  let item

  beforeAll(() => {
    return database.client.item.truncate({ force: true, searchPath: getClientDatabase(1) })
  })

  test('Should create a item', () => {
    const payload = {
      sectionId: 1,
      name: 'Cheese Burger',
      shortDescription: 'lorem ipsum',
      longDescription: 'lorem ipsum 2',
      imageUrl: 'https://servir.me',
      ingredients: 'Pão,Hamburguer,Queijo',
      price: 14.90,
      promotionPrice: 12.90,
      active: true,
    }

    return testServer
      .post('/items')
      .set(AUTH.HEADER, adminToken)
      .send(payload)
      .expect(201)
      .then(({ body }) => {
        item = body.result
      })
  })

  test('Should get the created item', () => {
    return testServer
      .get(`/item/${item.id}`)
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result).toEqual(item)
      })
  })

  test('Should update a item', () => {
    return testServer
      .put(`/item/${item.id}`)
      .send({
        name: 'new name',
      })
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result.name).toEqual('new name')
      })
  })

  test('Trying to get a non-existant item', () => {
    return testServer
      .get('/item/999')
      .set(AUTH.HEADER, adminToken)
      .expect(404)
  })

  test('Should delete the created item', () => {
    return testServer
      .del(`/item/${item.id}`)
      .set(AUTH.HEADER, adminToken)
      .expect(200)
  })
})
