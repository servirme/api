'use strict';

const BbPromise = require('bluebird');
const Exception = require('../Exceptions/Exception');
const InternalException = require('../Exceptions/InternalException');
const InvalidException = require('../Exceptions/InvalidException');
const I18n = require('../Services/I18n/I18n');
const object = require('../lib/utils/object');

class Controller {
    constructor() {
        this._i18n = I18n.getInstance();
        this._model = false;
    }

    _useModel(Model, alias = false) {
        const model = new Model();
        if (!alias) {
            this._model = model;
        } else {
            if (!this._model) {
                this._model = {};
            }
            this._model[alias] = model;
        }
        return this;
    }

    _useValidator(Validator, alias = false) {
        const validator = new Validator();
        if (!alias) {
            this._validator = validator;
        } else {
            if (!this._validator) {
                this._validator = {};
            }
            this._validator[alias] = validator;
        }
        return this;
    }

    lambdaWrapper(actionName) {
        return (event, context, callback) => {
            const rawReq = {
                headers: event.headers || {},
                queryString: event.queryStringParameters || {},
                path: event.pathParameters || {},
                body: event.body || '{}',
            };

            return BbPromise.resolve(rawReq)
                .then((req) => {
                    this._selectedLanguage = rawReq.headers['Accept-Language'] || I18n.validLocales[0];

                    try {
                        req.body = JSON.parse(req.body);
                    } catch (jsonParseException) {
                        throw new InvalidException('body');
                    }

                    if (this.validator) {
                        return this.validator.validate(actionName, req);
                    }
                    return req;
                })
                .then((reqValidated) => {
                    const bindedAction = this[actionName].bind(this);
                    return bindedAction(reqValidated);
                })
                .then((response) => {
                    const body = response.body || response;
                    const statusCode = response.statusCode;
                    const headers = response.headers;
                    const translate = response.translate;

                    return this.response(body, statusCode, headers, translate);
                })
                .catch(Exception, (err) => {
                    return this.response(err.getBody(), err.getHttpCode(), {}, err.getTranslateKeys());
                })
                .catch((err) => {
                    const error = new InternalException(err);
                    return this.response(error.getBody(), error.getHttpCode(), {}, error.getTranslateKeys());
                })
                .then((response) => {
                    callback(null, response);
                });
        };
    }

    response(body, statusCode = 200, headers = {}, translate = []) {
        translate.push('message');
        this._i18n.setLocale(this._selectedLanguage);
        translate.forEach((keyToTranslate) => {
            const value = object.getObjPropWithString(body, keyToTranslate);
            const translated = this._i18n.translate(value);

            object.setObjPropWithString(body, keyToTranslate, translated);
        });

        return {
            statusCode,
            headers,
            body: JSON.stringify(body),
        };
    }
}

module.exports = Controller;
