const BbPromise = require('bluebird')

require('../config/logger')

global.Promise = BbPromise
