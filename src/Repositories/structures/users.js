'use strict';

const userTable = require('../../configs/resources').tables.users;

module.exports.table = userTable;

module.exports.fields = {
    id: {
        primaryKey: true,
    },
};

module.exports.config = {

};
