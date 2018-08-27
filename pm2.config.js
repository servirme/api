module.exports = {
  apps: [
    {
      name: 'Servir.me API',
      script: './src/bin/server.js',
      watch: false,
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
}
