'use strict';

const Controller = require('./Controller');
const UserModel = require('../Models/UserModel');

class AuthController extends Controller {
    constructor() {
        super();

        this.model = new UserModel();
    }

    login() {
        return this.response({
            message: {
                key: 'auth.login.success',
                data: {
                    name: 'matheus',
                },
            },
        }, 200);
    }
}

module.exports = AuthController;
