'use strict';

Error.stackTraceLimit = Infinity;

class Exception extends Error {
    /**
     * @param {number} httpCode
     * @param {number} code
     * @param {string} message
     */
    constructor(httpCode = 500, code, message) {
        super(message);
        this._translateKeys = [];

        this._httpCode = httpCode;
        this._body = {
            code,
            message,
        };
    }

    addTranslateKey(key) {
        this._translateKeys.push(key);
    }

    /**
     * Retorna o body da exception
     * @return {object}
     */
    getBody() {
        return this._body;
    }

    getTranslateKeys() {
        return this._translateKeys;
    }

    /**
     * Retorna o código HTTP do erro
     * @return {number}
     */
    getHttpCode() {
        return this._httpCode;
    }

    /**
     * Retorna um object para ser passado como parâmetro para o callback da lambda
     */
    getCallbackPayload() {
        return {
            statusCode: this.getHttpCode(),
            body: this.getBody(),
        };
    }
}

module.exports = Exception;
