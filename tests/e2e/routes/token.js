const { AUTH } = require('../../../src/constants')
const testServer = require('../testServer')
const { auth } = require('../helpers')
const { models } = require('../../../src/helpers/database')

const { admin: getAdminToken } = auth

describe('Token routes', () => {
  const { token, data } = getAdminToken()

  beforeAll(async () => {
    await models.Token.create(data.id)
  })

  test('Should refresh token', () => testServer
    .get('/token/refresh')
    .set(AUTH.HEADER, token)
    .expect(200)
    .then(({ body }) => {
      expect(body.token).not.toEqual(token)
    }))

  test('Should successfully check token', () => testServer
    .get('/token/check')
    .set(AUTH.HEADER, token)
    .expect(200))

  test('Should disable token', () => testServer
    .delete(`/token/${token.id}`)
    .set(AUTH.HEADER, token)
    .expect(200))
})
