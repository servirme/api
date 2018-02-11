const { resolve } = require('path')
const dotenv = require('dotenv')

const { NODE_ENV = 'development' } = process.env

const envFile = resolve(__dirname, 'config', 'environment', NODE_ENV)

module.exports.config = () => {
  dotenv.config({
    path: envFile,
  })
}
