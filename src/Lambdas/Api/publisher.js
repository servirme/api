'use strict';

const publisher = (Controller, actions) => {
    const controller = new Controller();

    return actions.reduce((result, action) => {
        result[action] = controller.lambdaWrapper(action);

        return result;
    }, {});
};

module.exports = publisher;
