module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coverageReporters: ['lcov'],
  testPathIgnorePatterns: [
    '/node_modules/',
    'testServer.js',
  ],
  coverageDirectory: 'coverage',
}
