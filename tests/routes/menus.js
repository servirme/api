const { database, getClientDatabase } = require('../../src/helpers/database')
const { AUTH } = require('../../config/constants')
const testServer = require('../testServer')
const { auth } = require('../helpers')

const { admin: adminToken } = auth

describe('Menu routes', () => {
  let menu

  beforeAll(() => {
    return database.client.menu.truncate({ force: true, searchPath: getClientDatabase(1) })
  })

  test('Should create a menu', () => {
    const payload = {
      name: 'Menu principal',
      active: true,
    }

    return testServer
      .post('/menus')
      .set(AUTH.HEADER, adminToken)
      .send(payload)
      .expect(201)
      .then(({ body }) => {
        menu = body.result
      })
  })

  test('Should get the created menu', () => {
    return testServer
      .get(`/menus/${menu.id}`)
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result).toEqual(menu)
      })
  })

  test('Should update a menu', () => {
    return testServer
      .put(`/menus/${menu.id}`)
      .send({
        name: 'new name',
      })
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result.name).toEqual('new name')
      })
  })

  test('Trying to get a non-existant menu', () => {
    return testServer
      .get('/menus/999')
      .set(AUTH.HEADER, adminToken)
      .expect(404)
  })

  test('Should delete the created menu', () => {
    return testServer
      .del(`/menus/${menu.id}`)
      .set(AUTH.HEADER, adminToken)
      .expect(200)
  })
})
