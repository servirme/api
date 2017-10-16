'use strict';

// TODO
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');
const AWS = require('aws-sdk');
const InternalException = require('../../Exceptions/InternalException');
const AuthorizerException = require('../../Exceptions/AuthorizerException');

const resources = require('../../configs/resources');

const userPoolId = 123 || resources.cognito.UserPoolId;
const region = 123 || resources.cognito.region;
const iss = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
let pems;

const verifyToken = (token, decodedJwt, pem, callback) => {
    // Verify the signature of the JWT token to ensure it's really coming from your User Pool
    jwt.verify(token, pem, { issuer: iss }, (err, payload) => {
        if (err) {
            const exception = new AuthorizerException('invalidToken', token);
            callback(null, exception.getCallbackPayload());
        } else {
            // Valid token. Generate the API Gateway policy for the user
            // Always generate the policy on value of 'sub' claim and not for 'username' because username is reassignable
            // sub is UUID for a user which is never reassigned to another user.
            const principalId = payload.sub;
            const userGroup = decodedJwt.payload['cognito:groups'][0];
            const iam = new AWS.IAM();

            iam.getRolePolicy({
                RoleName: `${userGroup}-role`,
                PolicyName: 'scf-api-access',
            }).promise()
                .then((policy) => {
                    const policyDocument = JSON.parse(decodeURIComponent(policy.PolicyDocument));

                    policyDocument.context = {
                        username: decodedJwt.payload['cognito:username'],
                        userId: decodedJwt.payload['custom:user_id'],
                        groups: decodedJwt.payload['cognito:groups'],
                        email: decodedJwt.payload.email,
                    };

                    callback(null, { principalId, policyDocument });
                })
                .catch((getPolicyErr) => {
                    const exception = new InternalException(getPolicyErr);
                    callback(null, exception.getCallbackPayload());
                });
        }
    });
};

const validateToken = (event, callback) => {
    const authHeader = event.authorizationToken.split(' ');
    const token = authHeader[1];

    // Fail if the token is not jwt
    const decodedJwt = jwt.decode(token, { complete: true });
    if (!decodedJwt) {
        const exception = new AuthorizerException('decodeError', jwt);
        callback(exception.getAuthorizerResponse());
        return;
    }

    // Fail if token is not from your UserPool
    if (decodedJwt.payload.iss !== iss) {
        const exception = new AuthorizerException('issError', {
            tokenIss: decodedJwt.payload.iss,
            expectedIss: iss,
        });
        callback(exception.getAuthorizerResponse());
        return;
    }

    // Reject the jwt if it's not an 'Token id'
    if (decodedJwt.payload.token_use !== 'id') {
        const exception = new AuthorizerException('tokenUseError', `Expected tokenUse to be equal 'id' but got ${decodedJwt.payload.token_use}`);
        callback(exception.getAuthorizerResponse());
        return;
    }

    // Get the kid from the token and retrieve corresponding PEM
    const kid = decodedJwt.header.kid;
    const pem = pems[kid];
    if (!pem) {
        const exception = new AuthorizerException('pemError', `The kid '${kid}' doesn't have a pem. Available kids: ${Object.keys(pems).join(', ')}`);
        callback(exception.getAuthorizerResponse());
        return;
    }

    verifyToken(token, decodedJwt, pem, callback);
};

module.exports.handler = (event, context, callback) => {
    // Download PEM for your UserPool if not already downloaded
    if (!pems) {
        // Download the JWKs and save it as PEM
        axios.get(`${iss}/.well-known/jwks.json`)
            .then((result) => {
                pems = {};
                const keys = result.data.keys;
                for (let i = 0; i < keys.length; i += 1) {
                    // Convert each key to PEM
                    const keyId = keys[i].kid;
                    const modulus = keys[i].n;
                    const exponent = keys[i].e;
                    const keyType = keys[i].kty;
                    const jwk = { kty: keyType, n: modulus, e: exponent };
                    pems[keyId] = jwkToPem(jwk);
                }
                // Now continue with validating the token
                validateToken(event, callback);
            })
            .catch((err) => {
                const exception = new InternalException(err);
                callback(exception.getCallbackPayload());
            });
    } else {
        // PEMs are already downloaded, continue with validating the token
        validateToken(event, callback);
    }
};
