const { database } = require('../../src/helpers/database')
const { DATABASE, AUTH } = require('../../config/constants')
const testServer = require('../testServer')
const { auth } = require('../helpers')

const { admin: adminToken, master: masterToken } = auth

describe('Establishment routes', () => {
  let establishment

  beforeAll(() => {
    return database.master.establishment.truncate({ force: true, searchPath: DATABASE.MASTER })
  })

  test('Should create a establishment', () => {
    const payload = {
      name: 'Bar do Denis',
      active: true,
      logo: 'http://abc.s3.com/abc.jpg',
      slug: 'bar-do-denis',
      email: 'contato@bardodenis.com.br',
      site: 'bardodenis.com.br',
      landlinePhone: '4333433322',
      street: 'Rua',
      number: '25',
      district: 'Jardim',
      city: 'Londrina',
      state: 'PR',
      categoryId: 1,
      planId: 1,
    }

    return testServer
      .post('/establishments')
      .set(AUTH.HEADER, masterToken)
      .send(payload)
      .expect(201)
      .then(({ body }) => {
        establishment = body.result
      })
  })

  test('Should get the created establishment', () => {
    return testServer
      .get(`/establishments/${establishment.id}`)
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result).toEqual(establishment)
      })
  })

  test('Should update a establishment', () => {
    return testServer
      .put(`/establishments/${establishment.id}`)
      .send({
        name: 'new name',
      })
      .set(AUTH.HEADER, adminToken)
      .expect(200)
      .then(({ body }) => {
        expect(body.result.name).toEqual('new name')
      })
  })

  test('Trying to get a non-existant establishment', () => {
    return testServer
      .get('/establishments/999')
      .set(AUTH.HEADER, adminToken)
      .expect(404)
  })
})
