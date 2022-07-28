// @ts-check

const pkg = require('./package.json');

/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: pkg.engines.node.match(/[0-9]+/)?.[0] } },
    ],
    '@babel/preset-typescript',
  ],
};
