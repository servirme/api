'use strict';

const publisher = require('./publisher');
const UserController = require('../../Controllers/UserController');

module.exports = publisher(UserController, [
    'login',
    'show',
]);
