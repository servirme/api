'use strict';

const Exception = require('./Exception');
const internalExceptionErrorCode = require('../configs/errorCodes').internalError;
const log = require('../lib/log');

class InternalException extends Exception {
    /**
     * @param {...*} errs
     */
    constructor(...errs) {
        super(500, internalExceptionErrorCode, 'http-500');
        log('error', ...errs, this.stack);
    }
}

module.exports = InternalException;
