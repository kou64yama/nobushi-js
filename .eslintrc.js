// @ts-check

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['standard-with-typescript', 'prettier', 'plugin:jest/recommended'],
  parserOptions: {
    project: './tsconfig.base.json',
  },
  ignorePatterns: ['packages/*/lib', 'examples/*/lib', 'docs'],
  rules: {
    '@typescript-eslint/restrict-plus-operands': ['off'],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
