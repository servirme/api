'use strict';

const Exception = require('./Exception');
const conflictErrorCodes = require('../configs/errorCodes').conflict;

const suffixMessage = 'already-exists';

class ConflictException extends Exception {
    /**
     * @param {string} resourceName
     */
    constructor(resourceName = 'generic') {
        const message = `${resourceName}-${suffixMessage}`;
        super(409, conflictErrorCodes[resourceName], message);
    }
}

module.exports = ConflictException;
