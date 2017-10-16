'use strict';

const AWS = require('aws-sdk');
const AwsResource = require('./AwsResource');
const InternalException = require('../../Exceptions/InternalException');

class S3 extends AwsResource {
    constructor(bucketName) {
        super(bucketName);
        this.s3 = new AWS.S3();
    }

    /**
     * Faz upload de um arquivo para o S3
     * @param {string} filename Nome do arquivo
     * @param {string|Buffer} body Conteúdo do arquivo
     * @param {string} encoding Encoding do arquivo
     * @param {string} [bucketName=this.resourceName]
     * @return {Promise}
     */
    upload(filename, body, encoding, bucketName) {
        const params = {
            Body: body,
            Bucket: this.resourceName || bucketName,
            Key: filename,
        };

        if (encoding) {
            params.ContentEncoding = encoding;
        }

        return this.s3.putObject(params).promise()
            .then(() => {
                return filename;
            })
            .catch((err) => {
                throw new InternalException(err);
            });
    }
}

module.exports = S3;
