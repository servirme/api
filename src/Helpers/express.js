const BbPromise = require('bluebird')

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

module.exports.wrapControllerAction = (controller, action) => {
  const actionBinded = action.bind(controller)

  return (req, res) => {
    BbPromise.resolve(actionBinded(req))
      .then((response = {}) => {
        const {
          statusCode = 200,
          body = {},
          translate = [],
        } = response

        translate.forEach(res.translate)
        res.status(statusCode).send(body)
      })
  }
}
