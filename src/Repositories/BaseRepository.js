'use strict';

const dateISO = require('../lib/utils/date').dateISO;
const InternalException = require('../Exceptions/InternalException');
const NotImplementedException = require('../Exceptions/NotImplementedException');

const DELETE_TYPE = {
    VIRTUAL: 'virtual',
    REAL: 'real',
};

const TIMESTAMP = {
    CREATED: 'created_at',
    UPDATED: 'updated_at',
    DELETED: 'deleted_at',
};

const FILTER_TYPE = {
    EXISTS: 'EXISTS',
    EQUAL: 'EQUAL',
};

const REMOVE = '$remove';
const INCREMENT = '$add';
const APPEND = '$append';
const IF_NOT_EXISTS = '$ifNotExists';

const removeFunction = () => {
    return REMOVE;
};

const isRemove = (value) => {
    return value === REMOVE;
};

const aliasFunction = (key) => {
    return (value) => {
        return {
            [key]: value,
        };
    };
};

const isAliasFunction = (key) => {
    return (incrementValue) => {
        return incrementValue && typeof incrementValue[key] !== 'undefined' && incrementValue[key];
    };
};

class BaseRepository {
    constructor(structure) {
        this._alias = this.constructor.name.replace('Repository', '');

        this.setPageLimit(50);
        this._processStructure(structure);
    }

    _processStructure(structure) {
        if (!structure.fields || !structure.table) {
            throw new InternalException(`Structure for Repository ${this._alias} must have fields and table entry`, structure);
        }

        this.primaryKeys = [];
        this.tableName = structure.table;

        const fields = Object.keys(structure.fields);
        fields.forEach((field) => {
            const fieldData = structure.fields[field];
            if (fieldData.primaryKey) {
                this.primaryKeys.push(field);
            }
        });

        if (this.primaryKeys.length === 0) {
            throw new InternalException(`${this._alias} doesn't have any primary key`);
        }
    }

    setPageLimit(pageLimit) {
        this.pageLimit = pageLimit;
    }

    /**
     * Configura o tipo de deleção do repository em virtual ou real
     * @param deleteType
     * @protected
     */
    _setDeleteType(deleteType) {
        this.deleteType = deleteType;
    }

    /**
     * Realiza uma deleção virtual na tabela adicionando o campo deleted
     * @param keys Chave a ser deletada virtualmente
     * @return {Promise}
     * @private
     */
    _virtualDelete(keys) {
        return this.update(keys, {
            [TIMESTAMP.DELETED]: dateISO(),
        });
    }

    /**
     * Deleta uma, ou mais, entrada(s) do banco de acordo com o tipo de deleção: virtual ou real
     * @param keys
     * @return {Promise}
     * @protected
     */
    remove(...keys) {
        switch (this.deleteType) {
            case DELETE_TYPE.VIRTUAL:
                return this._virtualDelete(keys);
            case DELETE_TYPE.REAL:
                return this._realDelete(keys);
            default:
                throw new InternalException(`The resource '${this._alias}' can't be deleted because it doesn't have a delete type configured`);
        }
    }

    create() { // eslint-disable-line
        throw new NotImplementedException(__filename, 'create');
    }

    update() { // eslint-disable-line
        throw new NotImplementedException(__filename, 'update');
    }

    get() { // eslint-disable-line
        throw new NotImplementedException(__filename, 'get');
    }

    _realDelete() { // eslint-disable-line
        throw new NotImplementedException(__filename, '_realDelete');
    }
}

module.exports = BaseRepository;

module.exports.TIMESTAMP = TIMESTAMP;
module.exports.DELETE_TYPE = DELETE_TYPE;
module.exports.FILTER_TYPE = FILTER_TYPE;

module.exports.REMOVE = removeFunction;
module.exports.REMOVE.isRemove = isRemove;

module.exports.INCREMENT = aliasFunction(INCREMENT);
module.exports.INCREMENT.getValue = isAliasFunction(INCREMENT);

module.exports.APPEND = aliasFunction(APPEND);
module.exports.APPEND.getValue = isAliasFunction(APPEND);

module.exports.IF_NOT_EXISTS = aliasFunction(IF_NOT_EXISTS);
module.exports.IF_NOT_EXISTS.getValue = isAliasFunction(IF_NOT_EXISTS);
