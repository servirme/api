const lambda = require('./lambda')
const i18n = require('./i18n')
const publicAuth = require('./auth/public')
const adminAuth = require('./auth/private')

const basic = [
  lambda,
  i18n,
]

module.exports = {
  noAuth: basic,
  publicAuth: [
    ...basic,
    publicAuth,
  ],
  adminAuth: [
    ...basic,
    adminAuth,
  ],
}
