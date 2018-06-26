const { JWT_SECRET } = process.env

module.exports = {
  jwt: {
    issuer: 'api.servir.me',
    expiresIn: '1d',
    secret: JWT_SECRET,
  },
}
