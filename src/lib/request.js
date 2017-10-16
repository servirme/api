'use strict';

const axios = require('axios');
const BbPromise = require('bluebird');
const InternalException = require('../Exceptions/InternalException');
const htmlEntityEncode = require('./utils/string').htmlEntityEncode;

/**
 * O erro após ser normalizado
 * @typedef {{request: {method, headers, data, url}, response: {statusCode: number, statusText: *, headers: *, data: *}}} RequestErrorNormalized
 */

/**
 * Normaliza o erro para um formato mais amigável e universal
 * @param err
 * @return RequestErrorNormalized
 */
const normalizeError = (err) => {
    return {
        request: {
            method: err.config.method,
            headers: err.config.headers,
            data: err.config.data,
            url: err.config.url,
        },
        response: {
            statusCode: err.response.status,
            statusText: err.response.statusText,
            headers: err.response.headers,
            data: err.response.data,
        },
    };
};

class Request {
    static request(method, url, data, queryString = {}) {
        if (!method || !url) {
            throw new InternalException('Can\'t make a request without a method and an url');
        }

        const config = {
            method,
            data,
            url: htmlEntityEncode(url),
            params: queryString,
            timeout: 300000,
        };

        return axios(config)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return BbPromise.reject(normalizeError(err));
            });
    }

    static get(url, queryString, config) {
        return Request.request('get', url, undefined, queryString, config);
    }

    static post(url, data, queryString, config) {
        return Request.request('post', url, data, queryString, config);
    }

    static put(url, data, queryString, config) {
        return Request.request('put', url, data, queryString, config);
    }

    static delete(url, queryString, config) {
        return Request.request('delete', url, undefined, queryString, config);
    }

    static requestVerbInPath(domain, methodUrl, data, queryString) {
        const [, method, path] = methodUrl.match(/(.*?)\s(.*)/);

        return Request.request(method, domain + path, data, queryString);
    }
}

module.exports = Request;
