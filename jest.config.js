module.exports = {
  verbose: true,
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
