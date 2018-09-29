const { isProd } = require('./env')

const { JWT_SECRET } = process.env

module.exports = {
  jwt: {
    issuer: 'api.servir.me',
    expiresIn: isProd ? '1d' : '1y',
    secret: JWT_SECRET,
  },
}
