module.exports = {
  setupFiles: ['<rootDir>/src/tests/jestsetup.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/tests',
    '<rootDir>/src/mocks',
    '<rootDir>/src/generated',
    '<rootDir>/src/dictionary/mocks'
  ],
  globalTeardown: './src/tests/helpers/teardown.ts'
};
