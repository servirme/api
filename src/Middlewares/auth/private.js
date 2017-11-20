const { MODES, validate } = require('./_common')

module.exports.pre = (req) => {
  return validate(req, MODES.PRIVATE)
}
