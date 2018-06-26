const isCI = process.env.CI === 'true'

module.exports = {
  rootDir: '../../',
  verbose: true,
  bail: isCI,
  globalSetup: './tests/e2e/setup.js',
  globalTeardown: './tests/e2e/teardown.js',
  collectCoverage: false,
  testPathIgnorePatterns: [
    'testServer.js',
    'setup.js',
    'teardown.js',
    'helpers.js',
    'jest.config.js',
  ],
  testMatch: [
    '**/tests/e2e/**/*.js',
  ],
}
