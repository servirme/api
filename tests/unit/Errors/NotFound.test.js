const BaseError = require('../../../src/Errors/BaseError')
const NotFoundError = require('../../../src/Errors/NotFound')
const { notFound } = require('../../../config/errorCodes')

const startCode = 1100
const endCode = 1199

describe('NotFoundError', () => {
  test('should be a instance of BaseError', () => {
    const error = new NotFoundError()

    expect(error instanceof BaseError).toBe(true)
  })

  test('should have correct code and message', () => {
    const error = new NotFoundError()
    const body = error.getBody()

    expect(error.getHttpCode()).toBe(404)
    expect(body.message).toEqual('not-found.generic')
    expect(body.code).toEqual(startCode)
  })

  test('all error codes must be inside range', () => {
    const validateCodes = (code) => {
      expect(code).toBeGreaterThanOrEqual(startCode)
      expect(code).toBeLessThanOrEqual(endCode)
    }
    Object.values(notFound).forEach(validateCodes)
  })
})
