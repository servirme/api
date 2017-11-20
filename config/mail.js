module.exports = {
  from: 'no-reply@servir.me',
  transport: {
    host: 'webmail.servir.me',
    port: 465,
    secure: true,
    auth: {
      user: 'contato@servir.me',
      pass: process.env.EMAIL_PASSWORD,
    },
  },
}
