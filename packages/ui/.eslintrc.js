module.exports = {
  extends: [
    '../../.eslintrc',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  rules: {
    'jsx-a11y/no-autofocus': 'off'
  }
};
