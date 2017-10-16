'use strict';

const BbPromise = require('bluebird');
const Dynamo = require('aws-sdk').DynamoDB.DocumentClient;
const BaseRepository = require('./BaseRepository');
const security = require('../lib/utils/security');
const dateISO = require('../lib/utils/date').dateISO;

/* Exceptions */
const InvalidException = require('../Exceptions/InvalidException');
const ConflictException = require('../Exceptions/ConflictException');
const NotFoundException = require('../Exceptions/NotFoundException');
const InternalException = require('../Exceptions/InternalException');

// TODO - tamanho da url ? Page hash
const secretKey = 'D9PFtGiX9jMP8ehhGQfYpOXC8wz4N26fjb30M5sYlPdfRURRA5rbu';
const dynamo = new Dynamo();

const paginationKeyEncode = (dynamoKey, page = 1, directionForward = true) => {
    if (!dynamoKey && directionForward) {
        return false;
    }

    return security.encrypt(JSON.stringify({
        key: dynamoKey,
        page,
        forward: directionForward,
    }), secretKey);
};

const paginationKeyDecode = (hash) => {
    if (!hash) {
        return false;
    }
    try {
        const json = security.decrypt(hash, secretKey);
        return JSON.parse(json);
    } catch (err) {
        throw new InvalidException('pageHash');
    }
};

const generatePaginationData = (dynamoKeyReceived, usedHash) => {
    if (typeof usedHash === 'string') {
        return generatePaginationData(dynamo, paginationKeyDecode(usedHash));
    }
    let currentPage = 1;
    if (usedHash) {
        currentPage = usedHash.page;
    }

    return {
        nextPageHash: dynamoKeyReceived ? paginationKeyEncode(dynamoKeyReceived, currentPage + 1, true) : false,
        prevPageHash: currentPage > 1 ? paginationKeyEncode(usedHash.key, currentPage - 1, false) : false,
        currentPage,
    };
};

const operationsMap = {
    [BaseRepository.FILTER_TYPE.EQUAL]: (field, value) => {
        return {
            attrValues: true,
            expression: `${field}=${value}`,
        };
    },
    [BaseRepository.FILTER_TYPE.EXISTS]: (field, value, fieldRawValue) => {
        return {
            attrValues: false,
            expression: fieldRawValue ? `attribute_exists(${field})` : `attribute_not_exists(${field})`,
        };
    },
};

const generateConditionExpression = (object, operation = false, prefix = '') => {
    const expressions = [];
    const names = {};
    const values = {};

    if (!operation) {
        Object.keys(object)
            .forEach((operationKey) => {
                const operationResult = generateConditionExpression(object[operationKey], operationKey, '');

                if (operationResult.names) {
                    Object.assign(names, operationResult.names);
                }

                if (operationResult.values) {
                    Object.assign(values, operationResult.values);
                }

                if (operationResult.expression) {
                    expressions.push(operationResult.expression);
                }
            });
    } else {
        Object.keys(object).forEach((recordKey) => {
            const recordKeyAlias = `#${recordKey}`;
            const recordValue = object[recordKey];
            const expressionAttrName = `${prefix}${recordKeyAlias}`;
            const expressionAttrValue = `:${prefix.replace(/[.#]/g, '')}${recordKey}`;
            names[recordKeyAlias] = recordKey;

            if (typeof recordValue === 'object') {
                if (Array.isArray(recordValue)) {
                    const arrayConditions = recordValue
                        .map((recordArrayValue, index) => {
                            const expressionArrayAttrValue = `${expressionAttrValue}${index}`;
                            const operationResult = operationsMap[operation](
                                expressionAttrName,
                                expressionAttrValue,
                                recordValue
                            );
                            if (operationResult.attrValues) {
                                values[expressionArrayAttrValue] = recordArrayValue;
                            }
                            return operationResult.expression;
                        })
                        .join(' OR ');
                    expressions.push(`(${arrayConditions})`);
                } else {
                    const recursiveData = generateConditionExpression(recordValue, `${expressionAttrName}.`);
                    expressions.push(recursiveData.expression);
                    Object.assign(names, recursiveData.names);
                    Object.assign(values, recursiveData.values);
                }
            } else {
                const operationResult = operationsMap[operation](expressionAttrName, expressionAttrValue, recordValue);
                if (operationResult.attrValues) {
                    values[expressionAttrValue] = recordValue;
                }
                expressions.push(operationResult.expression);
            }
        });
    }

    return {
        names: Object.keys(names).length ? names : undefined,
        values: Object.keys(values).length ? values : undefined,
        expression: expressions.length ? expressions.join(' AND ') : '',
    };
};

const generateUpdateExpression = (record, options, prefix = '') => {
    const names = {};
    const values = {};
    const addExpressions = [];
    const setExpressions = [];
    const deleteAttrs = [];

    Object.keys(record).forEach((recordKey) => {
        const recordKeyAlias = `#${recordKey}`;
        const recordValue = record[recordKey];
        const expressionAttrName = `${prefix}${recordKeyAlias}`;
        const expressionAttrValue = `:${prefix.replace(/[.#]/g, '')}${recordKey}`;

        names[recordKeyAlias] = recordKey;

        const incrementValue = BaseRepository.INCREMENT.getValue(recordValue);
        if (incrementValue) {
            addExpressions.push(`${recordKeyAlias} ${expressionAttrValue}`);
            values[expressionAttrValue] = parseFloat(incrementValue);
            return;
        }

        const appendValue = BaseRepository.APPEND.getValue(recordValue);
        if (appendValue) {
            setExpressions.push(`${recordKeyAlias} = list_append(if_not_exists(${recordKeyAlias}, :empty_array), ${expressionAttrValue})`);
            values[expressionAttrValue] = Array.isArray(appendValue) ? appendValue : [appendValue];
            values[':empty_array'] = [];
            return;
        }

        const fallbackValue = BaseRepository.IF_NOT_EXISTS.getValue(recordValue);
        if (fallbackValue) {
            setExpressions.push(`${recordKeyAlias} = if_not_exists(${recordKeyAlias}, ${expressionAttrValue})`);
            values[expressionAttrValue] = fallbackValue;
            return;
        }

        if (BaseRepository.REMOVE.isRemove(recordValue)) {
            deleteAttrs.push(expressionAttrName);
            return;
        }

        if (
            typeof recordValue === 'object'
            && !Array.isArray(recordValue)
            && !options.noObjectRecursion
            && Object.keys(recordValue).length !== 0
        ) {
            const recursiveData = generateUpdateExpression(recordValue, options, `${expressionAttrName}.`);

            setExpressions.push(...recursiveData.setExpressions);
            addExpressions.push(...recursiveData.addExpressions);
            deleteAttrs.push(...recursiveData.deleteAttrs);

            Object.assign(names, recursiveData.names);
            Object.assign(values, recursiveData.values);
            return;
        }

        values[expressionAttrValue] = recordValue;
        setExpressions.push(`${expressionAttrName}=${expressionAttrValue}`);
    });

    const result = {
        names,
        values,
    };

    if (prefix) {
        // Recursivo
        result.setExpressions = setExpressions;
        result.addExpressions = addExpressions;
        result.deleteAttrs = deleteAttrs;
    } else {
        const expressions = [];
        if (setExpressions.length) {
            expressions.push(`SET ${setExpressions.join()}`);
        }
        if (addExpressions.length) {
            expressions.push(`ADD ${addExpressions.join()}`);
        }
        if (deleteAttrs.length) {
            expressions.push(`REMOVE ${deleteAttrs.join()}`);
        }

        result.expression = expressions.join(' ');
    }

    return result;
};

/**
 * @typedef {Object} Options
 * @property {boolean} includeDeleted Se deve atualizar entradas já deletadas virtualmente também. Default = false
 * @property {boolean} onlyDeleted Se deve pesquisar apenas por entradas já deletadas virtualmente. Default = false
 * @property {boolean} options.all Se deseja todas as records de uma vez. Default = false
 * @property {string} indexName Nome do índice. Caso seja composto por 2 chaves, utilizar '_' como separador.
 * @property {string} pageHash Hash da página
 */

class DynamoRepository extends BaseRepository {
    get(keys, filters, options = {}) {
        if (typeof keys !== 'undefined') {
            if (options.single || (!options.indexName && this.primaryKeys.length === keys.length)) {
                return this._findOne(keys, options);
            }
            if (Array.isArray(keys[0])) {
                return this._findMulti(keys);
            }
            return this._query(keys, filters, options);
        }

        return this._scan(filters, options);
    }

    _findMulti(keys) {
        const keysObjects = keys.map((key) => {
            return this._mountKeyObject(key);
        });

        return new BbPromise((resolve, reject) => {
            this.entity.dynogelsEntity.getItems(keysObjects, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.map((x) => {
                        return x.toPlainObject();
                    }));
                }
            });
        });
    }

    /**
     * Given a record, returns the main keys for it.
     * @param {object} record The record.
     * @return {object} The key from the record.
     * @private
     */
    _getRecordKey(record) {
        if (typeof record[this.entity.partitionKey] === 'undefined') {
            throw new InternalException(`Can't update a entry at without partitionKey ${this.entity.partitionKey}. ${this._alias}`);
        }
        const key = {
            [this.entity.partitionKey]: record[this.entity.partitionKey],
        };
        if (this.entity.sortKey) {
            if (typeof record[this.entity.sortKey] === 'undefined') {
                throw new InternalException(`Can't update a entry at without rangeKey ${this.entity.partitionKey}. ${this._alias}`);
            }
            key[this.entity.sortKey] = record[this.entity.sortKey];
        }
        return key;
    }

    /**
     * Gera filtros padrões. Exemplo: attribute_not_exists(deleted_at) caso a deleção do repository seja virtual.
     * @return {object}
     * @private
     */
    _getBaseFilters(options) {
        const baseFilters = {};

        if (!options.includeDeleted && this.deleteType === BaseRepository.DELETE_TYPE.VIRTUAL) {
            baseFilters[BaseRepository.FILTER_TYPE.EXISTS] = {
                [BaseRepository.TIMESTAMP.DELETED]: false,
            };
        }

        if (options.onlyDeleted && this.deleteType === BaseRepository.DELETE_TYPE.VIRTUAL) {
            baseFilters[BaseRepository.FILTER_TYPE.EXISTS] = {
                [BaseRepository.TIMESTAMP.DELETED]: true,
            };
        }

        return baseFilters;
    }

    /**
     *
     * @param {Options} options Opções do dynogels
     * @return {object}
     * @private
     */
    _generateOptions(options = {}) {
        options.expected = options.expected || {};

        if (this.deleteType === BaseRepository.DELETE_TYPE.VIRTUAL
            && !options.includeDeleted) {
            options.expected[BaseRepository.TIMESTAMP.DELETED] = {
                Exists: false,
            };
        }

        if (typeof options.onlyDeleted !== 'undefined'
            && this.deleteType === BaseRepository.DELETE_TYPE.VIRTUAL
            && options.onlyDeleted) {
            options.expected[BaseRepository.TIMESTAMP.DELETED] = {
                Exists: true,
            };
        }

        if (options.exists) {
            const fields = Array.isArray(options.exists) ? options.exists : [options.exists];
            options.expected = fields.reduce((result, field) => {
                result[field] = {
                    Exists: true,
                };
                return result;
            }, options.expected);
        }

        if (options.notExists) {
            const fields = Array.isArray(options.notExists) ? options.notExists : [options.notExists];
            options.expected = fields.reduce((result, field) => {
                result[field] = {
                    Exists: false,
                };
                return result;
            }, options.expected);
        }

        if (options.overwrite) {
            options.overwrite = !!options.overwrite;
        }
        return options;
    }

    /**
     * @param keys
     * @param options
     * @return {*}
     * @protected
     */
    _findOne(keys, options = {}) {
        if (options.indexName) {
            return this._query(keys, undefined, options)
                .then((items) => {
                    if (items.results.length === 1) {
                        return items.results[0];
                    }

                    const key = this._mountKeyObject(keys, options.indexName);
                    key._options = options;

                    if (items.results.length === 0) {
                        throw new NotFoundException(this._alias, key);
                    }
                    throw new ConflictException(this._alias, key);
                });
        }
        return this._getOne(keys, options);
    }

    /**
     * Cria uma entrada nova da entidade no banco.
     * @param {object|array<object>} record Objeto a ser salvo.
     * @param {Options} [options={}]
     * @return {Promise}
     * @protected
     */
    create(record, options = {}) {
        const nowISO = dateISO();

        if (Array.isArray(record)) {
            const records = record.map((recordEntry, index) => {
                if (options.setUpdatedAt) {
                    record[index][BaseRepository.TIMESTAMP.UPDATED] = nowISO;
                }

                return record;
            });

            return this._batchWrite(records);
        }
        if (options.setUpdatedAt) {
            record[BaseRepository.TIMESTAMP.UPDATED] = nowISO;
        }
        record[BaseRepository.TIMESTAMP.CREATED] = nowISO;

        const dynamoParams = {
            TableName: this.tableName,
            Item: record,
            ReturnValues: 'ALL_NEW',
        };

        if (!options.overwrite) {
            const { names, expressions } = this.primaryKeys
                .reduce((result, primaryKey) => {
                    const name = `#${primaryKey}`;
                    result.names[name] = primaryKey;
                    result.expression.push(`(attribute_exists(${name}))`);

                    return result;
                }, {
                    names: {},
                    expression: [],
                });
            dynamoParams.ExpressionAttributeNames = names;
            dynamoParams.ConditionExpression = expressions.join(' AND ');
        }

        return dynamo.put(dynamoParams).promise()
            .then((data) => {
                return data.Attributes;
            })
            .catch((err) => {
                if (err.code === 'ConditionalCheckFailedException') {
                    throw new NotFoundException(this._alias, this._mountKeyObject(record));
                }
                throw new InternalException(err, dynamoParams);
            });
    }

    _batchRequest(put, remove) {
        const records = [];

        if (put && put.length) {
            const putRecords = put.map((record) => {
                return {
                    PutRequest: {
                        Item: record,
                    },
                };
            });
            records.push(...putRecords);
        }

        if (remove && remove.length) {
            const removeRecords = remove.map((record) => {
                return {
                    RemoveRequest: {
                        Item: record,
                    },
                };
            });
            records.push(...removeRecords);
        }

        const dynamoParams = {
            RequestItems: {
                [this.tableName]: records,
            },
        };

        return dynamo.batchWrite(dynamoParams).promise()
            .catch((err) => {
                throw new InternalException(err, dynamoParams);
            });
    }

    _batchWrite(records) {
        return this._batchRequest(records);
    }

    _batchDelete(records) {
        return this._batchRequest(records);
    }

    /**
     * Abstração do método query do Dynamo.
     * @param keys Chaves a serem pesquisadas
     * @param filters Filtros da query
     * @param {Options} opts Opções da query
     * @return {Promise}
     */
    _query(keys, filters = {}, opts = {}) {
        const key = this._mountKeyObject(keys, opts.indexName);
        const keyCondition = generateConditionExpression({
            [BaseRepository.FILTER_TYPE.EQUAL]: key,
        });

        const options = this._generateOptions(opts);

        const dynamoParams = {
            TableName: this.tableName,
            Key: key,
            Limit: this.pageLimit,
            KeyConditionExpression: keyCondition.expression,
            ExpressionAttributeNames: keyCondition.names,
            ExpressionAttributeValues: keyCondition.values,
        };

        if (Object.keys(filters).length) {
            const filter = generateConditionExpression(filters);
            dynamoParams.FilterExpression = filter.expression;
            Object.assign(dynamoParams.ExpressionAttributeNames, filter.names);
            Object.assign(dynamoParams.ExpressionAttributeValues, filter.values);
        }

        if (options.indexName) {
            dynamoParams.IndexName = this.entity.getIndexName(options.indexName);
        }

        if (options.pageHash) {
            dynamoParams.ExclusiveStartKey = paginationKeyDecode(options.pageHash).key;
        }

        return dynamo.query(dynamoParams).promise()
            .then((data) => {
                const returnData = {
                    results: data.Items,
                    pagination: generatePaginationData(data.LastEvaluatedKey, options.pageHash),
                };

                if (options.all && returnData.pagination.nextPageHash) {
                    options.pageHash = returnData.pagination.nextPageHash;
                    return this.query(keys, filters, options)
                        .then((result) => {
                            returnData.results.push(...result.results);
                            returnData.pagination.nextPageHash = false;
                            returnData.pagination.prevPageHash = false;
                            returnData.pagination.currentPage = 1;

                            return returnData;
                        });
                }
                return returnData;
            })
            .catch((err) => {
                if (err.code === 'ConditionalCheckFailedException') {
                    throw new NotFoundException(this._alias, key);
                }
                throw new InternalException(err, dynamoParams);
            });
    }

    _scan(filters = {}, opts = {}) {
        const options = this._generateOptions(opts);

        const dynamoParams = {
            TableName: this.tableName,
            Limit: this.pageLimit,
        };

        if (Object.keys(filters).length) {
            const filter = generateConditionExpression(filters);
            dynamoParams.FilterExpression = filter.expression;
            dynamoParams.ExpressionAttributeNames = filter.names;
            dynamoParams.ExpressionAttributeValues = filter.values;
        }

        if (options.indexName) {
            dynamoParams.IndexName = this.entity.getIndexName(options.indexName);
        }

        if (options.pageHash) {
            dynamoParams.ExclusiveStartKey = paginationKeyDecode(options.pageHash).key;
        }

        return dynamo.scan(dynamoParams).promise()
            .then((data) => {
                const returnData = {
                    results: data.Items,
                    pagination: generatePaginationData(data.LastEvaluatedKey, options.pageHash),
                };

                if (options.all && returnData.pagination.nextPageHash) {
                    options.pageHash = returnData.pagination.nextPageHash;
                    return this._scan(filters, options)
                        .then((result) => {
                            returnData.results.push(...result.results);
                            returnData.pagination.nextPageHash = false;
                            returnData.pagination.prevPageHash = false;
                            returnData.pagination.currentPage = 1;

                            return returnData;
                        });
                }

                return returnData;
            })
            .catch((err) => {
                throw new InternalException(err);
            });
    }

    /**
     * Recupera um registro do dynamo
     * @param {object} keys A chave do item a ser recuperado: um objeto com os campos e os seus respectivos valores
     * @param {Options} options Opções para o método _generateOptions
     * @return {Promise}
     * @private
     */
    _getOne(keys, options = {}) {
        const dynamoParams = {
            TableName: this.tableName,
        };

        dynamoParams.Key = this._mountKeyObject(keys);

        return dynamo.get(dynamoParams).promise()
            .then((data) => {
                const item = data.Item;
                if (!item) {
                    throw new NotFoundException(this._alias);
                }
                return item;
            })
            .catch((err) => {
                if (err.code === 'ConditionalCheckFailedException') {
                    throw new NotFoundException(this._alias);
                }
                throw new InternalException(err, dynamoParams, options);
            });
    }

    update(keys, record, opts = {}) {
        record[BaseRepository.TIMESTAMP.UPDATED] = dateISO();

        this.primaryKeys.forEach((primaryKeyField) => {
            delete record[primaryKeyField];
        });

        const key = this._mountKeyObject(keys);
        const updateData = generateUpdateExpression(record, opts);

        if (!opts.createIfNotExists) {
            opts.exists = typeof opts.exists === 'undefined' ? [this.primaryKeys[0]] : opts.exists;
        }
        const options = this._generateOptions(opts);

        const dynamoParams = {
            TableName: this.tableName,
            Key: key,
            ReturnValues: 'ALL_NEW',
        };
        dynamoParams.UpdateExpression = updateData.expression;
        dynamoParams.ExpressionAttributeNames = updateData.names;
        dynamoParams.ExpressionAttributeValues = updateData.values;

        if (options.condition) {
            const conditionData = generateConditionExpression(options.condition);

            Object.assign(dynamoParams.ExpressionAttributeNames, conditionData.names);
            Object.assign(dynamoParams.ExpressionAttributeValues, conditionData.values);
            dynamoParams.ConditionExpression = conditionData.expression;
        }

        const expectedKeys = Object.keys(options.expected);
        if (expectedKeys.length) {
            dynamoParams.ConditionExpression = dynamoParams.ConditionExpression || '';
            dynamoParams.ConditionExpression += expectedKeys
                .map((field) => {
                    const fieldAlias = `#ce_${field}`;
                    dynamoParams.ExpressionAttributeNames[fieldAlias] = field;
                    let expression = '';

                    if (options.expected[field].Exists) {
                        expression = 'attribute_exists';
                    } else {
                        expression = 'attribute_not_exists';
                    }
                    return `${expression}(${fieldAlias})`;
                })
                .join(' AND ');
        }

        return dynamo.update(dynamoParams).promise()
            .then((data) => {
                return data.Attributes;
            })
            .catch((err) => {
                if (err.code === 'ConditionalCheckFailedException') {
                    throw new NotFoundException(this._alias, key);
                }
                throw new InternalException(err, dynamoParams, options);
            });
    }

    /**
     * Monta o objeto chave do índice principal
     * @param {array<string>} keyValues Chaves do objeto
     * @return {object}
     * @private
     */
    _mountKeyObject(keyValues) {
        const keys = this.primaryKeys;
        const key = {
            [keys[0]]: keyValues[0],
        };
        if (keys[1] && typeof keyValues[1] !== 'undefined') {
            key[keys[1]] = keyValues[1];
        }
        return key;
    }

    /**
     * Realiza uma deleção real do item na tabela
     * @param keys A chave a ser deletada
     * @return {Promise}
     * @private
     */
    _realDelete(keys) {
        const key = this._mountKeyObject(keys);
        const dynamoParams = {
            TableName: this.tableName,
            Key: key,
            ExpressionAttributeNames: {
                '#partitionKey': this.entity.partitionKey,
            },
            ConditionExpression: '(attribute_exists(#partitionKey))',
            ReturnValues: 'ALL_OLD',
        };

        if (this.entity.sortKey) {
            dynamoParams.ExpressionAttributeNames['#range_key'] = this.entity.sortKey;
            dynamoParams.ConditionExpression += 'AND (attribute_exists(#range_key))';
        }

        return dynamo.delete(dynamoParams).promise()
            .then((data) => {
                return data.Attributes;
            })
            .catch((err) => {
                if (err.code === 'ConditionalCheckFailedException') {
                    throw new NotFoundException(this._alias, key);
                }
                throw new InternalException(err, dynamoParams);
            });
    }
}

module.exports = DynamoRepository;
