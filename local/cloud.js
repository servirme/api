'use strict';

process.env.AWS_REGION = 'us-west-2';

const AWS = require('aws-sdk');

const configureLocalCloud = () => {
    AWS.config.dynamodb = {
        endpoint: 'http://localhost:4569',
    };
};

const platform = process.platform;
if (!platform.match(/^win/)) {
    configureLocalCloud();
}

