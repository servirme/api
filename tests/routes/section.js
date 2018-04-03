const { database, getClientDatabase } = require('../../src/helpers/database')
const { AUTH } = require('../../config/constants')
const testServer = require('../testServer')
const { auth } = require('../helpers')

const { admin: adminToken } = auth

describe('section routes', () => {
  let section

  beforeAll(() => {
    return database.client.section.truncate({ force: true, searchPath: getClientDatabase(1) })
  })

  test('Should create a section', () => {
    const payload = {
      name: 'section principal',
      active: true,
    }

    return testServer
      .post('/sections')
      .set(AUTH.HEADER, adminToken)
      .send(payload)
      .expect(201)
      .then(({ body }) => {
        section = body.result
      })
  })

  test('Should get the created section', () => {
    return testServer
      .get(`/sections/${section.id}`)
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result).toEqual(section)
      })
  })

  test('Should update a section', () => {
    return testServer
      .put(`/sections/${section.id}`)
      .send({
        name: 'new name',
      })
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result.name).toEqual('new name')
      })
  })

  test('Trying to get a non-existant section', () => {
    return testServer
      .get('/sections/999')
      .set(AUTH.HEADER, adminToken)
      .expect(404)
  })

  test('Should delete the created section', () => {
    return testServer
      .del(`/sections/${section.id}`)
      .set(AUTH.HEADER, adminToken)
      .expect(200)
  })
})
