module.exports = {
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'warn',
    'operator-linebreak': 'warn',
    'import/no-unresolved': 'warn',
    'import/extensions': 'warn',
  },
  extends: 'opengg',
};
