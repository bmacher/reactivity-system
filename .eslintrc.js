module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },

  extends: [
    '@bmacher/eslint-config-typescript',
  ],

  rules: {
    'no-underscore-dangle': 'off',
  },
};
