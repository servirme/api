'use strict';

const AWS = require('aws-sdk');
const BbPromise = require('bluebird');
const AwsResource = require('./AwsResource');
const stringUtils = require('../../lib/utils/string');
const InternalException = require('../../Exceptions/InternalException');

/**
 * Transforma uma record para o formato do Kinesis
 * @param record
 * @return {{Data, PartitionKey}}
 */
const transformToKinesis = (record) => {
    return {
        Data: JSON.stringify(record),
        PartitionKey: stringUtils.uuid(),
    };
};

/**
 * Tamanho máximo do array que pode ser enviado para o Kinesis
 * @type {number}
 */
const LENGTH_LIMIT = 500;
const RECORD_SIZE_LIMIT = 1000000;

class Kinesis extends AwsResource {
    constructor(streamName) {
        super(streamName);
        this.kinesis = new AWS.Kinesis();
        this.setChunkSize(LENGTH_LIMIT);
    }

    /**
     * Normaliza a entrada de acordo com o padrão do Kinesis. Decoda do base 64 e
     * @param {object} input O 'event.Records' vindo do stream do Kinesis ou uma entrada única 'event.Records[x]'
     * @param {...function} transforms Funções de transformação a serem aplicadas na entrada
     * @return {Array<object>|object}
     */
    static normalizeInput(input, ...transforms) {
        if (input) {
            if (Array.isArray(input)) {
                return input.map((record) => {
                    // const date = new Date(record.kinesis.approximateArrivalTimestamp * 1000);
                    // date.setHours(date.getHours() - 3);
                    // console.log('debug', date.toISOString());

                    const decoded = stringUtils.base64decode(record.kinesis.data);
                    return transforms.reduce((result, transformFunction) => {
                        return transformFunction(result);
                    }, decoded);
                });
            }
            const decoded = stringUtils.base64decode(input.kinesis.data);
            if (transforms.length) {
                return transforms.reduce((result, transformFunction) => {
                    return transformFunction(result);
                }, decoded);
            }
            return decoded;
        }
        throw new InternalException('Kinesis normalize falsy', input);
    }

    /**
     * Configura o tamanho dos chunks a serem enviados para o Kinesis
     * @param {number} maxChunkSize Tamanho máximo dos chunks
     * @return {Kinesis}
     */
    setChunkSize(maxChunkSize) {
        if (!maxChunkSize || maxChunkSize > LENGTH_LIMIT) {
            this._maxChunkSize = LENGTH_LIMIT;
        } else {
            this._maxChunkSize = maxChunkSize;
        }
        return this;
    }

    /**
     * Envia dados para o Kinesis
     * @param {object|Array<object>} data A coleção (ou o item) a serem enviados para o Kinesis
     * @param {string} [streamName=this.resourceName] O nome do stream para enviar o dado
     * @param {string} arrayKeyToSplit Nome do campo que pode ser splitado para diminuir o tamanho da request
     * @return {Promise}
     */
    sendData(data, streamName, arrayKeyToSplit = false) {
        let kinesisFunction;
        let params;

        if (Array.isArray(data)) {
            if (!data.length) {
                return BbPromise.resolve();
            }
            if (data.length > this._maxChunkSize) {
                // Vai dividindo em blocos de maxChunkSize itens e envia cada um deles para o kinesis
                const chunkSize = Math.ceil(data.length / Math.ceil(data.length / this._maxChunkSize));
                const promises = [];
                while (data.length) {
                    const dataChunk = data.splice(0, chunkSize);
                    promises.push(this.sendData(dataChunk));
                }
                return BbPromise.all(promises);
            }
            kinesisFunction = this.kinesis.putRecords.bind(this.kinesis);
            params = {
                StreamName: streamName || this.resourceName,
                Records: data.map(transformToKinesis),
            };
        } else {
            kinesisFunction = this.kinesis.putRecord.bind(this.kinesis);
            params = transformToKinesis(data);
            params.StreamName = streamName || this.resourceName;

            if (params.Data.length > RECORD_SIZE_LIMIT && arrayKeyToSplit && Array.isArray(data[arrayKeyToSplit])) {
                const chunksData = [];
                const numberOfChunks = Math.ceil(params.Data.length / RECORD_SIZE_LIMIT);
                const chunkSize = Math.ceil(data[arrayKeyToSplit].length / numberOfChunks);

                while (data[arrayKeyToSplit].length) {
                    chunksData.push(data[arrayKeyToSplit].splice(0, chunkSize));
                }

                return BbPromise.all(chunksData.map((dataChunk) => {
                    data[arrayKeyToSplit] = dataChunk;
                    return this.sendData(data, streamName, arrayKeyToSplit);
                }));
            }
        }

        return kinesisFunction(params).promise()
            .catch((err) => {
                if (err.code === 'ValidationException') {
                    if (data.length) {
                        return BbPromise.all(data.map(this.sendData.bind(this)));
                    }
                }
                throw new InternalException(err);
            });
    }
}

module.exports = Kinesis;
