// @ts-check

import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import root from './package.json';

/**
 * @template T
 * @template R
 * @param {(value: T) => Iterable<R> | PromiseLike<Iterable<R>>} transform
 * @returns {(values: T[]) => Promise<R[]>}
 */
const flatMap = (transform) => {
  return (values) => {
    return values.reduce(
      async (previous, value) => [
        ...(await previous),
        ...(await transform(value)),
      ],
      Promise.resolve(/** @type {R[]} */ ([])),
    );
  };
};

/**
 * @template T
 * @param {(value: T) => boolean} predicate
 * @returns {(values: T[]) => T[]}
 */
const filter = (predicate) => {
  return (values) => values.filter(predicate);
};

/**
 * @param {import('node:fs').PathLike} path
 * @param {BufferEncoding} encoding
 * @returns {Promise<*>}
 */
const readJson = async (path, encoding) => {
  const data = await readFile(path);
  return JSON.parse(data.toString(encoding));
};

/**
 * @param {string} workspace
 * @returns {Promise<[import('rollup').RollupOptions] | []>}
 */
export const getRollupOptions = async (workspace = '.') => {
  try {
    const entryPoints = await promisify(glob)(
      join(workspace, 'src/**/index.ts'),
    );
    if (entryPoints.length === 0) return [];

    const { dependencies = {}, peerDependencies = {} } = await readJson(
      join(workspace, 'package.json'),
      'utf8',
    );
    const externals = Object.keys({ ...dependencies, ...peerDependencies });
    return [
      {
        input: entryPoints,
        output: [
          {
            format: 'es',
            dir: join(workspace, 'lib'),
            entryFileNames: '[name].mjs',
            preserveModules: true,
            preserveModulesRoot: join(workspace, 'src'),
          },
          {
            format: 'cjs',
            dir: join(workspace, 'lib'),
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: join(workspace, 'src'),
          },
        ],
        plugins: [
          babel({
            babelrcRoots: join(workspace),
            babelHelpers: 'bundled',
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
          }),
          nodeResolve({
            preferBuiltins: true,
            extensions: ['.ts', '.mjs', '.js', '.json', '.node'],
          }),
        ],
        external: (id) => {
          for (const external of externals) {
            if (id === external) return true;
            if (id.startsWith(`${external}/`)) return true;
          }
          return false;
        },
      },
    ];
  } catch (reason) {
    return [];
  }
};

export default Promise.resolve(root.workspaces)
  .then(flatMap(promisify(glob)))
  .then(filter((workspace) => workspace.startsWith('packages/')))
  .then(flatMap(getRollupOptions));
