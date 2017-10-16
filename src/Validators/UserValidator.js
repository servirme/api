'use strict';

const Joi = require('joi');
const Validator = require('./Validator');

class UserValidator extends Validator {
    constructor() {
        super();

        this.addPredefined('UserNumber', Joi.number().integer().min(1).max(151));

        this.addValidator('create', {
            body: Joi.object({
                number: this.getPredefined('UserNumber', true),
                name: Joi.string().required(),
                price: Joi.number().required(),
                stock: Joi.number(),
            }),
        });

        this.addValidator('show', {
            params: {
                number: this.getPredefined('UserNumber', true),
            },
        });

        this.addValidator('extinct', {
            params: {
                number: this.getPredefined('UserNumber', true),
            },
        });

        this.addValidator('donate', {
            params: {
                number: Joi.number().required(),
            },
            body: Joi.object({
                quantity: Joi.number().required(),
            }),
        });

        this.addValidator('buy', {
            params: {
                number: Joi.number().required(),
            },
            body: {
                cardNumber: Joi.string().creditCard().required(),
                cardExpirationDate: Joi.string().length(4).required(),
                cardHolderName: Joi.string().required(),
                cardCvv: Joi.string().length(3).required(),
                quantity: Joi.number().integer().required(),
            },
        });

        this.addValidator('list', {
            query: {
                page: Joi.number().integer(),
            },
        });
    }
}

module.exports = UserValidator;
