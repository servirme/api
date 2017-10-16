'use strict';

const structure = require('./structures/users');
const DynamoRepository = require('./DynamoRepository');

class UserRepository extends DynamoRepository {
    constructor() {
        super(structure);
    }
}

module.exports = UserRepository;
