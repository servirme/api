const {
  forEach,
  toPairs,
} = require('ramda')

module.exports.wrapAction = action => async (req, res, next) => {
  try {
    const response = await action(req)
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

    // NOTE: will log body before applying i18n middleware
    res.body = body

    res.status(statusCode).send(body)
  } catch (error) {
    next(error)
  }
}
