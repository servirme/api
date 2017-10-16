'use strict';

const Exception = require('./Exception');
const expiredErrorCodes = require('../configs/errorCodes').expired;

const messageSuffix = 'expired';

class ExpiredException extends Exception {
    /**
     * @param {string} resourceName
     */
    constructor(resourceName = 'generic') {
        const message = `${resourceName}-${messageSuffix}`;
        super(410, expiredErrorCodes[resourceName], message);
    }
}

module.exports = ExpiredException;
