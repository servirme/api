'use strict';

const crypto = require('crypto');

const DEFAULT_SECRET = '129387ksdlfadsfqoiw34u1209312kjasd098jm123khskmdlajsnmd908123n';

module.exports.hash = (text, secret = DEFAULT_SECRET, algorithm = 'sha512') => {
    const textHash = crypto.createHmac(algorithm, secret);
    textHash.update(text);
    return textHash.digest('hex');
};

module.exports.encrypt = (text, secret = DEFAULT_SECRET, algorithm = 'aes-256-ctr') => {
    const cipher = crypto.createCipher(algorithm, secret);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

module.exports.decrypt = (textHash, secret = DEFAULT_SECRET, algorithm = 'aes-256-ctr') => {
    const decipher = crypto.createDecipher(algorithm, secret);
    let dec = decipher.update(textHash, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

module.exports.md5 = (text) => {
    return crypto.createHash('md5').update(text).digest('hex');
};
