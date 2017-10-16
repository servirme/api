'use strict';

const Exception = require('./Exception');
const unauthorizedErrorCodes = require('../configs/errorCodes').unauthorized;

const messageSuffix = 'unauthorized';

class NotAuthorizedException extends Exception {
    /**
     * @param {string} resourceName
     */
    constructor(resourceName = 'generic') {
        const message = `${resourceName}-${messageSuffix}`;
        super(401, unauthorizedErrorCodes[resourceName], message);
    }
}

module.exports = NotAuthorizedException;
