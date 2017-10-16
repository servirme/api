'use strict';

const Model = require('./Model');
const UserRepository = require('../Repositories/UserRepository');
const UserTransform = require('../Transforms/UserTransform');

class UserModel extends Model {
    constructor() {
        super();

        this._useRepository(UserRepository);
        this._useTransform(UserTransform);
    }
}

module.exports = UserModel;
