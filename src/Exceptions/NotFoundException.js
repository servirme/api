'use strict';

const Exception = require('./Exception');
const notFoundErrorCodes = require('../configs/errorCodes').notFound;

const notFoundSufix = 'not-found';

class NotFoundException extends Exception {
    /**
     * @param {string} [resourceName='not-found'] Nome do recurso a ser sufixado com '-not-found', ficando
     * 'resourceName-not-found'
     */
    constructor(resourceName = 'generic') {
        const message = `${resourceName}-${notFoundSufix}`;
        super(404, notFoundErrorCodes[resourceName], message);
    }
}

module.exports = NotFoundException;
