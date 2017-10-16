'use strict';

const AWS = require('aws-sdk');
const BbPromise = require('bluebird');
const resources = require('../configs/resources');

// exceptions
const NotFoundException = require('../Exceptions/NotFoundException');
const ConflictException = require('../Exceptions/ConflictException');
const InvalidException = require('../Exceptions/InvalidException');
const InternalException = require('../Exceptions/InternalException');
const ExpiredException = require('../Exceptions/ExpiredException');
const NotAuthorizedException = require('../Exceptions/NotAuthorizedException');
const LimitExceededException = require('../Exceptions/LimitExceededException');

class Cognito {
    constructor() {
        this._cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    }

    signUp(data) {
        const username = data.username;
        const password = data.password;
        const email = data.email;
        const userId = data.user_id;

        const params = {
            ClientId: resources.cognito.ClientId,
            Password: password,
            Username: username,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'custom:user_id',
                    Value: userId,
                },
            ],
            ValidationData: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'custom:user_id',
                    Value: userId,
                },
            ],
        };

        return this._cognitoIdentityServiceProvider.signUp(params).promise()
            .then((result) => {
                return this.addUserToGroup(username, resources.cognito.usersGroup)
                    .then(() => {
                        return result;
                    });
            })
            .catch((err) => {
                switch (err.code) {
                    case 'UsernameExistsException':
                        return BbPromise.reject(new ConflictException('user', params));
                    case 'InvalidParameterException':
                        return BbPromise.reject(new InvalidException('signUp'));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    addUserToGroup(username, groupName) {
        const params = {
            Username: username,
            GroupName: groupName,
            UserPoolId: resources.cognito.UserPoolId,
        };

        return this._cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    confirmSignUp(username, confirmationCode) {
        const params = {
            ClientId: resources.cognito.ClientId,
            ConfirmationCode: confirmationCode,
            Username: username,
        };

        return this._cognitoIdentityServiceProvider.confirmSignUp(params).promise()
            .then((result) => {
                return result;
            }).catch((err) => {
                switch (err.code) {
                    case 'UserNotFoundException':
                        return BbPromise.reject(new NotFoundException('user', params));
                    case 'CodeMismatchException':
                        return BbPromise.reject(new InvalidException('confirmCode', params));
                    case 'AliasExistsException':
                        return BbPromise.reject(new ConflictException('user', params));
                    case 'ExpiredCodeException':
                        return BbPromise.reject(new ExpiredException('confirmationCode', params));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    resendConfirmationCode(username) {
        const params = {
            ClientId: resources.cognito.ClientId,
            Username: username,
        };

        return this._cognitoIdentityServiceProvider.resendConfirmationCode(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'InvalidParameterException':
                        return BbPromise.reject(new InvalidException('userAlreadyConfirmed'));
                    case 'UserNotFoundException':
                        return BbPromise.reject(new NotFoundException('user', params));
                    case 'LimitExceededException':
                        return BbPromise.reject(new LimitExceededException('resendCode'));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    signIn(username, password) {
        // ADMIN_NO_SRP_AUTH is used on secure back-end to avoid the SRP calculations,
        // in order to use these APIs (adminInitiateAuth) and have them accept passwords in plain text,
        // you must enable them for the app in the console (User Pools > Apps > Enable Sign-in API...)
        const params = {
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: resources.cognito.ClientId,
            UserPoolId: resources.cognito.UserPoolId,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        };

        return this._cognitoIdentityServiceProvider.adminInitiateAuth(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'InvalidParameterException':
                        return BbPromise.reject(new InvalidException('userAlreadyConfirmed'));
                    case 'UserNotFoundException':
                        return BbPromise.reject(new NotFoundException('user', params));
                    case 'NotAuthorizedException':
                        return BbPromise.reject(new NotAuthorizedException('credentials', params));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    forgotPassword(username) {
        const params = {
            ClientId: resources.cognito.ClientId,
            Username: username,
        };

        return this._cognitoIdentityServiceProvider.forgotPassword(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'UserNotFoundException':
                        return BbPromise.reject(new NotFoundException('user', params));
                    case 'InvalidParameterException':
                        return BbPromise.reject(new InvalidException('userUnconfirmedForgotPassword'));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    confirmForgotPassword(username, password, confirmationCode) {
        const params = {
            Username: username,
            ConfirmationCode: confirmationCode,
            Password: password,
            ClientId: resources.cognito.ClientId,
        };

        return this._cognitoIdentityServiceProvider.confirmForgotPassword(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'UserNotFoundException':
                        return BbPromise.reject(new NotFoundException('user', params));
                    case 'CodeMismatchException':
                        return BbPromise.reject(new InvalidException('confirmCode', params));
                    case 'ExpiredCodeException':
                        return BbPromise.reject(new ExpiredException('confirmationCode', params));
                    case 'InvalidParameterException':
                        return BbPromise.reject(new InvalidException('confirmForgetPassword'));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    changePassword(accessToken, previousPassword, proposedPassword) {
        const params = {
            PreviousPassword: previousPassword,
            ProposedPassword: proposedPassword,
            AccessToken: accessToken,
        };

        return this._cognitoIdentityServiceProvider.changePassword(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'NotAuthorizedException':
                        return BbPromise.reject(new NotAuthorizedException('credentials', params));
                    case 'InvalidPasswordException':
                        return BbPromise.reject(new InvalidException('password'));
                    case 'LimitExceededException':
                        return BbPromise.reject(new LimitExceededException('changePassword'));
                    case 'InvalidParameterException':
                        return BbPromise.reject(new InvalidException('confirmForgetPassword'));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    signOut(accessToken) {
        const params = {
            AccessToken: accessToken,
        };

        return this._cognitoIdentityServiceProvider.globalSignOut(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'NotAuthorizedException':
                        return BbPromise.reject(new NotAuthorizedException('accessToken', params));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }

    refreshSession(refreshToken) {
        const params = {
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: resources.cognito.ClientId,
            UserPoolId: resources.cognito.UserPoolId,
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
            },
        };

        return this._cognitoIdentityServiceProvider.adminInitiateAuth(params).promise()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'InvalidParameterException':
                        return BbPromise.reject(new InvalidException('userAlreadyConfirmed'));
                    case 'UserNotFoundException':
                        return BbPromise.reject(new NotFoundException('user', params));
                    case 'NotAuthorizedException':
                        return BbPromise.reject(new NotAuthorizedException('refreshToken', params));
                    default:
                        return BbPromise.reject(new InternalException(err));
                }
            });
    }
}

module.exports = Cognito;
