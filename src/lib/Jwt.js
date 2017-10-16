'use strict';

const jwt = require('jsonwebtoken');
const config = require('../configs/auth');

class Jwt {
    static sign(data) {
        return jwt.sign(data, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
            issuer: config.jwt.issuer,
        });
    }

    static verify(token) {
        try {
            jwt.verify(token, config.jwt.secret);
            return true;
        } catch (err) {
            return false;
        }
    }

    static decode(token) {
        return jwt.decode(token);
    }
}

module.exports = Jwt;
