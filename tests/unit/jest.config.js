const isCI = process.env.CI === 'true'

module.exports = {
  rootDir: '../../',
  verbose: true,
  // watch: !isCI,
  bail: isCI,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coverageReporters: ['lcov'],
  coverageDirectory: '<rootDir>/coverage',
  globalSetup: './tests/unit/setup.js',
  testMatch: [
    '**/tests/unit/**/*.test.js',
  ],
}
