'use strict';

const getObjPropWithString = require('./object').getObjPropWithString;

module.exports.chunkify = (array, n, numberOfChunks) => {
    const out = [];
    const size = numberOfChunks ? Math.ceil(array.length / n) : n;

    while (array.length) {
        out.push(array.splice(0, size));
    }

    return out;
};

module.exports.arrayDiff = (base, exclude) => {
    return base.filter((key) => {
        return exclude.indexOf(key) === -1;
    });
};

/**
 * Agrupa um array de acordo com o campo especificado
 * @param {array} array O array de dados
 * @param {string} field O campo a ser utilizado como chave. Níveis podem ser separados por .
 * @return {object} Um objeto onde as chaves são os valores do campo definido no parametro field e os valores é um array
 * com os itens de array.
 */
module.exports.groupBy = (array, field) => {
    return array.reduce((result, arrayItem) => {
        const fieldValue = getObjPropWithString(arrayItem, field);
        if (!result[fieldValue]) {
            result[fieldValue] = [];
        }
        result[fieldValue].push(arrayItem);
        return result;
    }, {});
};

/**
 * Retorna uma função que faz a verificação para filtrar itens repetidos de um array.
 * ATENÇÃO: este método pode dar problema quando o parâmetro field é mapeado para um objeto, pois utiliza (internamente)
 * o método <b>toString()</b> que transforma um objeto em '[object Object]'.
 *
 * @param {String} field Campo chave a ser utilizado como chave para o filtro. Caso o parâmetro não seja uma string,
 * faz o filtro de acordo com o valor do array através do indexOf.
 * @returns {function} Uma função para ser utilizada como parâmetro do método <b>Array.filter</b>.
 */
module.exports.onlyUnique = (field) => {
    if (typeof field === 'string') {
        const found = {};
        return (value) => {
            const fieldValue = getObjPropWithString(value, field);
            if (!found[fieldValue]) {
                found[fieldValue] = true;
                return true;
            }
            return false;
        };
    }
    return (value, index, self) => {
        return self.indexOf(value) === index;
    };
};
