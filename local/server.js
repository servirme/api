/* eslint-disable no-console, global-require */

'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const BbPromise = require('bluebird');
const yaml = require('js-yaml');
const authorizerFunction = require('../src/Lambdas/Api/authorizer').handler;
require('./cloud');

const serverlessPath = path.join(__dirname, '..', 'serverless.yml');
const serverlessFile = yaml.safeLoad(fs.readFileSync(serverlessPath));

const PORT = process.env.PORT || 3000;
const app = express();

const username = 'spykman';
const password = 'test-123';
let token = false;
const authorizerMiddleware = (req, res, next) => {
    let tokenPromise;

    if (!token) {
        console.log(username, password, token);
        token = 123;
    } else {
        tokenPromise = BbPromise.resolve(token);
    }

    tokenPromise
        .then((useToken) => {
            return new BbPromise((resolve, reject) => {
                authorizerFunction({
                    authorizationToken: `Bearer ${useToken}`,
                }, {}, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        })
        .then((data) => {
            req.authorizer = data.policyDocument.context;
            next();
        })
        .catch((err) => {
            res.status(401).send({
                message: err,
            });
        });
};

const files = {};
const lambdaWrapper = (lambdaHandler) => {
    return (req, res) => {
        const event = {
            headers: req.headers,
            body: JSON.stringify(req.body),
            pathParameters: req.params,
            queryStringParameters: req.query,
            authorizer: req.authorizer,
            methodArn: 'arn:aws:execute-api:us-west-2:344254304759:8b591hliw4/*/GET/logs',
        };
        const context = {};
        const callback = (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err.message);
            } else {
                if (data.headers) {
                    Object.keys(data.headers).forEach((header) => {
                        res.set(header, data.headers[header]);
                    });
                }
                res.status(data.statusCode).send(data.body);
            }
        };

        lambdaHandler(event, context, callback);
    };
};

const registerRoutes = () => {
    Object.keys(serverlessFile.functions).forEach((lambdaFunction) => {
        const functionData = serverlessFile.functions[lambdaFunction];
        if (functionData.events) {
            functionData.events
                .filter((event) => {
                    return event.http;
                })
                .forEach((event) => {
                    const httpEvent = event.http;
                    const method = httpEvent.method.toLowerCase();
                    const apiPath = httpEvent.path.replace(/\{(.*?)\}/g, ':$1');
                    const [, file, handler] = functionData.handler.match(/(.*)\.(.*)/);
                    if (!files[file]) {
                        files[file] = require(`../${file}`);
                    }
                    console.log(method, apiPath, functionData.handler);

                    const routesHandler = [lambdaWrapper(files[file][handler])];
                    if (httpEvent.authorizer) {
                        routesHandler.unshift(authorizerMiddleware);
                    }

                    app[method](apiPath, ...routesHandler);
                });
        }
    });
};

console.log('\x1Bc');
app.use(cors());
registerRoutes();

app.listen(PORT, () => {
    console.log(`API running in localhost:${PORT}`);
});
