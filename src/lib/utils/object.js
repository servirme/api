'use strict';

const onlyUnique = require('./array').onlyUnique;
const InternalException = require('../../Exceptions/InternalException');

/**
 * Renomeia uma chave do objeto
 * @param {object} object
 * @param {string} oldKey
 * @param {string} newKey
 * @return {object}
 */
const renameKey = (object, oldKey, newKey) => {
    object[newKey] = object[oldKey];
    delete object[oldKey];
    return object;
};
module.exports.renameKey = renameKey;

/**
 * Renomeia várias chaves de um objeto
 * @param {object} object
 * @param {object} replaceMap
 * @return {object}
 */
module.exports.renameKeys = (object, replaceMap) => {
    return Object.keys(replaceMap).reduce((obj, oldKey) => {
        const newKey = replaceMap[oldKey];
        return renameKey(obj, oldKey, newKey);
    }, object);
};

const cleanObject = (obj, deep = false) => {
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
            if (deep && !Array.isArray(obj[key]) && typeof obj[key] === 'object') {
                result[key] = cleanObject(obj[key], true);
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    }, {});
};
module.exports.cleanObject = cleanObject;

/**
 * Mescla dois objetos dando prioridade ao segundo parâmetro
 * @param {object} objBase Objeto base
 * @param {object} objPriority Objeto prioridade. Este objeto possui maior prioridade sobre o objeto base.
 * @param {object} options Opções da mesclagem dos objetos.
 * @param {boolean} options.arrayConcat Caso tenha dois arrays, deve concatenar os arrays ?
 * @return {object} Merged object
 */
const mergeObject = (objBase = {}, objPriority = {}, options = {}) => {
    const allKeys = Object.keys(objPriority).concat(Object.keys(objBase)).filter(onlyUnique());
    const res = {};
    allKeys.forEach((key) => {
        res[key] = objPriority[key];
        if (typeof objPriority[key] === 'object' && typeof objBase[key] === 'object') {
            if (Array.isArray(objPriority[key]) && Array.isArray(objBase[key])) {
                if (options.arrayConcat) {
                    res[key] = objPriority[key].concat(objBase[key]);
                } else {
                    res[key] = objPriority[key];
                }
            } else if (!Array.isArray(objPriority[key]) && !Array.isArray(objBase[key])) {
                res[key] = mergeObject(objBase[key], objPriority[key]);
            } else {
                res[key] = objPriority[key];
            }
        } else {
            res[key] = typeof objPriority[key] !== 'undefined' ? objPriority[key] : objBase[key];
        }
    });
    return res;
};
module.exports.mergeObject = mergeObject;

module.exports.getObjPropWithString = (obj, propString, separator = '.') => {
    return propString.split(separator).reduce((result, prop) => {
        return typeof result !== 'undefined' ? result[prop] : undefined; // Para prevenir "can't read property X of undefined"
    }, obj);
};

module.exports.setObjPropWithString = (obj = {}, propString, value, separator = '.') => {
    const hierarchy = propString.split(separator);
    const lastIndex = hierarchy.length - 1;

    hierarchy
        .reduce((result, prop, index) => {
            const typeObjProp = typeof result[prop];
            if (index === lastIndex) {
                result[prop] = value;
            } else if (typeObjProp === 'undefined') {
                result[prop] = {};
            } else if (typeObjProp !== 'object') {
                throw new InternalException(`Can't set property ${propString} into object`, JSON.stringify(obj, null, 2));
            }

            return result[prop];
        }, obj);

    return obj;
};

module.exports.isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
