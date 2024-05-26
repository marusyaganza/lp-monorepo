module.exports = {
  setupFiles: ['<rootDir>/jestsetup.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/tests',
    '<rootDir>/src/mocks',
    '<rootDir>/src/generated',
    '<rootDir>/src/dictionary/mocks'
  ]
};
