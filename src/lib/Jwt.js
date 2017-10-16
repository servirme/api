'use strict';

const jwt = require('jsonwebtoken');
const config = require('../configs/auth');

class Jwt {
    /**
     * Sign a new web token
     *
     * @param data
     * @returns {*}
     */
    static sign(data) {
        return jwt.sign(data, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
            issuer: config.jwt.issuer,
        });
    }

    /**
     * Verify if a given token is valid
     *
     * @param token
     * @returns {boolean}
     */
    static verify(token) {
        try {
            jwt.verify(token, config.jwt.secret);
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Decode the given token
     *
     * @param token
     * @returns {*}
     */
    static decode(token) {
        return jwt.decode(token);
    }
}

module.exports = Jwt;
