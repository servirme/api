'use strict';

const Exception = require('./Exception');
const limitExceededErrorCodes = require('../configs/errorCodes').limitExceeded;

const messageSuffix = 'limit-exceeded';

class LimitExceededException extends Exception {
    /**
     * @param {string} resourceName
     */
    constructor(resourceName = 'generic') {
        const message = `${resourceName}-${messageSuffix}`;
        super(429, limitExceededErrorCodes[resourceName], message);
    }
}

module.exports = LimitExceededException;
