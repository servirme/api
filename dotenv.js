const { resolve } = require('path')
const dotenv = require('dotenv')

const { env } = require('./config/env')

const envFile = resolve(__dirname, 'config', 'environment', env)

dotenv.config({
  path: envFile,
})
