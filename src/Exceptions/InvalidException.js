'use strict';

const Exception = require('./Exception');
const invalidErrorCode = require('../configs/errorCodes').invalid;

const messageSuffix = 'invalid';

class InvalidException extends Exception {
    /**
     * @param {string} resourceName
     */
    constructor(resourceName = 'generic') {
        const message = `${resourceName}-${messageSuffix}`;
        super(400, invalidErrorCode[resourceName], message);
    }
}

module.exports = InvalidException;
