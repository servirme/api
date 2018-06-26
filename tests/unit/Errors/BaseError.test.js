const BaseError = require('../../../src/Errors/BaseError')

describe('BaseError', () => {
  test('should be a instance of Error', () => {
    const error = new BaseError()

    expect(error instanceof Error).toBe(true)
  })

  test('should have correct fields', () => {
    const errorMessage = 'Unit test error'
    const httpCode = 1
    const errorCode = 10

    const error = new BaseError(httpCode, errorCode, errorMessage)

    const expectedBody = {
      code: errorCode,
      message: errorMessage,
    }

    expect(error._httpCode).toBe(httpCode)
    expect(error.getHttpCode()).toBe(error._httpCode)

    expect(error._translateKeys).toEqual([])
    expect(error.getTranslateKeys()).toBe(error._translateKeys)

    expect(error._body).toEqual(expectedBody)
    expect(error.getBody()).toBe(error._body)
  })

  test('default code should be 500', () => {
    const error = new BaseError()

    expect(error.getHttpCode()).toBe(500)
  })

  test('should have added translate key', () => {
    const error = new BaseError()
    const key = 'servir.me'

    error.addTranslateKey(key)

    expect(error.getTranslateKeys()).toContain(key)
  })
})
