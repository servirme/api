const NotAuthorizedException = require('./NotAuthorizedException')
const log = require('../lib/log')

class AuthorizerException extends NotAuthorizedException {
  /**
   * @param {number} reason
   * @param {any} resource
   */
  constructor(reason, resource) {
    super(`jwt_${reason}`, resource)
    log('debug', reason, resource)
  }

  // eslint-disable-next-line
  getAuthorizerResponse() {
    return 'Unauthorized'
  }
}

module.exports = AuthorizerException
