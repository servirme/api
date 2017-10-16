'use strict';

module.exports = (level, ...data) => {
    console.log(level.toUpperCase(), ...data); // eslint-disable-line no-console
};
