const InvalidException = require('../Exceptions/InvalidException')

let lambdaCallback

module.exports.pre = ([event, context, callback]) => {
  context.callbackWaitsForEmptyEventLoop = false

  lambdaCallback = callback

  const req = {
    headers: event.headers || {},
    queryString: event.queryStringParameters || {},
    path: event.pathParameters || {},
    body: event.body || '{}',
  }

  try {
    req.body = JSON.parse(req.body)
  } catch (jsonParseException) {
    throw new InvalidException('body')
  }

  return req
}

module.exports.post = ({ statusCode, body, headers = {} }) => {
  headers['Content-Type'] = 'application/json'

  lambdaCallback(null, {
    statusCode,
    headers,
    body: JSON.stringify(body),
  })
}
