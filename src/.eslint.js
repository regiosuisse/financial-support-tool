module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['standard', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': ['error', {ignore: ['children']}],
    'react/react-in-jsx-scope': ['off']
  }
}
