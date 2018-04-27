const isCI = process.env.CI === 'true'

module.exports = {
  verbose: true,
  bail: isCI,
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coverageReporters: ['lcov'],
  testPathIgnorePatterns: [
    'testServer.js',
    'setup.js',
    'teardown.js',
    'helpers.js',
  ],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/tests/**/*.js',
  ],
}
