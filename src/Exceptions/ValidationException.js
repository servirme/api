'use strict';

const Exception = require('./Exception');
const validationErrorCode = require('../configs/errorCodes').validationError;

const validationErrorsField = 'validationErrors';

class ValidationException extends Exception {
    /**
     * @param {object} errorsObject Objeto com os erros
     */
    constructor(errorsObject) {
        const errorsLength = Object.keys(errorsObject).length;
        super(422, validationErrorCode, {
            key: 'validation-error',
            data: {
                errorsLength,
            },
        });

        this._body[validationErrorsField] = Object.keys(errorsObject)
            .reduce((errorObject, field) => {
                this.addTranslateKey(`${validationErrorsField}.${field}`);
                errorObject[field] = {
                    key: `validation.${errorsObject[field].rule}`,
                    data: errorsObject[field].context,
                };

                return errorObject;
            }, {});
    }
}

module.exports = ValidationException;
