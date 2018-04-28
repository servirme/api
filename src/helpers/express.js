const {
  forEach,
  toPairs,
} = require('ramda')

module.exports.extractResponseBody = (chunk, headers) => {
  if (chunk) {
    const isJson = headers && headers['content-type'] && headers['content-type'].indexOf('json') >= 0

    const stringBody = chunk.toString()
    if (isJson) {
      try {
        return JSON.parse(stringBody)
      } catch (e) {
        return stringBody
      }
    }

    return stringBody
  }

  return chunk
}

module.exports.wrapAction = (action) => {
  return (req, res, next) => {
    Promise.resolve(action(req))
      .then((response = {}) => {
        const {
          statusCode = 200,
          body = {},
          headers = {},
          translate = [],
        } = response

        translate.forEach(res.translate)

        forEach(([key, value]) => {
          res.set(key, value)
        }, toPairs(headers))

        res.status(statusCode).send(body)
      })
      .catch(next)
  }
}
