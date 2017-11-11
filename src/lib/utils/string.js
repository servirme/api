const uuid = require('uuid/v4')

module.exports.uuid = (removeDashes = true) => {
  let id = uuid()
  if (removeDashes) {
    id = id.replace(/-/g, '')
  }
  return id
}

module.exports.clean = (string, separator = '-') => {
  const regex = new RegExp(`[^a-zA-Z0-9/${separator}]`, 'g')
  return string
    .replace(/\s/g, separator)
    .replace(regex, '')
    .toLowerCase()
}

module.exports.base64encode = (str) => {
  return new Buffer(str).toString('base64')
}

module.exports.base64decode = (base64) => {
  return new Buffer(base64, 'base64').toString('utf8')
}
