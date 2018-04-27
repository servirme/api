module.exports = {
  apps: [
    {
      name: 'Servir.me API',
      script: './server.js',
      watch: false,
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
}
