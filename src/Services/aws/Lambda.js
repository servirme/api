'use strict';

const AWS = require('aws-sdk');
const AwsResource = require('./AwsResource');
const InternalException = require('../../Exceptions/InternalException');

const nodeEnv = process.env.NODE_ENV;

const lambdaPrefixes = {
    core: `g2b-api-core-${nodeEnv}-`,
};

class Lambda extends AwsResource {
    constructor(type = 'core') {
        super();
        this.prefix = lambdaPrefixes[type];
        this.lambda = new AWS.Lambda();
    }

    call(lambdaName, eventData) {
        const functionName = `${this.prefix}${lambdaName}`;

        return this.lambda.invoke({
            FunctionName: functionName,
            InvocationType: 'Event',
            Payload: JSON.stringify(eventData),
        }).promise()
            .catch((err) => {
                throw new InternalException(err);
            });
    }
}

module.exports = Lambda;
