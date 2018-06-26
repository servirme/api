const { AUTH } = require('../../../config/constants')
const testServer = require('../testServer')
const { database } = require('../../../src/helpers/database')
const { auth } = require('../helpers')

const { admin: getAdminToken } = auth

describe('Establishment routes', () => {
  let establishment
  let adminToken

  beforeAll(() => {
    adminToken = getAdminToken()

    return database.master.establishment.truncate({ force: true })
      .then(() => database.master.establishmentUser.truncate({ force: true }))
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
      .set(AUTH.HEADER, adminToken)
      .send(payload)
      .expect(201)
      .then(({ body }) => {
        establishment = body.result
      })
  })

  test('Should get the created establishment', () => testServer
    .get(`/establishment/${establishment.id}`)
    .set(AUTH.HEADER, adminToken)
    .expect(200)
    .then(({ body }) => {
      expect(body.result).toEqual(establishment)
    }))

  test('Should update a establishment', () => testServer
    .put(`/establishment/${establishment.id}`)
    .send({
      name: 'new name',
    })
    .set(AUTH.HEADER, adminToken)
    .expect(200)
    .then(({ body }) => {
      expect(body.result.name).toEqual('new name')
    }))

  test.skip('Trying to get user establishments', () => testServer
    .get('/establishments/my')
    .set(AUTH.HEADER, adminToken)
    .expect(200)
    .then(({ body }) => {
      expect(typeof body.result).toBe('array')
    }))
})
