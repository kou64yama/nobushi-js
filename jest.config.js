// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  collectCoverageFrom: ['packages/*/src/**/*.ts', 'packages/*/src/**/*.tsx'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^@nobushi/([^/]*)': '<rootDir>/packages/$1/src',
  },
};
