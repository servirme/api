'use strict';

const publisher = require('./publisher');
const AuthController = require('../../Controllers/AuthController');

module.exports = publisher(AuthController, [
    'login',
]);
