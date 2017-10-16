'use strict';

const Controller = require('./Controller');
const UserValidator = require('../Validators/UserValidator');
const UserModel = require('../Models/UserModel');

class UserController extends Controller {
    constructor() {
        super();
        this._useModel(UserModel);
        this._useValidator(UserValidator);
    }
}

module.exports = UserController;
