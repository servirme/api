module.exports = {
  verbose: true,
  globalSetup: './__tests__/setup.js',
  globalTeardown: './__tests__/teardown.js',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coverageReporters: ['lcov'],
  testPathIgnorePatterns: [
    '/node_modules/',
    'testServer.js',
    'setup.js',
    'teardown.js',
    'helpers.js',
  ],
  coverageDirectory: 'coverage',
}
