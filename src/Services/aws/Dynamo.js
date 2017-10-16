'use strict';

const AWS = require('aws-sdk');
const AwsResource = require('./AwsResource');

const unmarshalItem = (object) => {
    return AWS.DynamoDB.Converter.output({
        M: object,
    });
};

const getTableName = (eventARN) => {
    const matches = eventARN.match(/.*?table\/(.*?)\/.*/);
    return matches[1];
};

class Dynamo extends AwsResource {
    static normalizeStreamInput(records) {
        return records.map((record) => {
            const result = {
                tableName: getTableName(record.eventSourceARN),
                keys: unmarshalItem(record.dynamodb.Keys),
            };
            if (record.dynamodb.OldImage) {
                result.oldImage = unmarshalItem(record.dynamodb.OldImage);
            }
            if (record.dynamodb.NewImage) {
                result.newImage = unmarshalItem(record.dynamodb.NewImage);
            }
            return result;
        });
    }
}

module.exports = Dynamo;
