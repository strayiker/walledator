import babel from 'rollup-plugin-babel';
import sourceMaps from 'rollup-plugin-sourcemaps';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const deps = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

const cjs = (overrides = {}) => ({
  exports: 'named',
  format: 'cjs',
  sourcemap: true,
  ...overrides,
});

const prodPlugins = [
  terser({
    mangle: { module: true },
    sourcemap: true,
  }),
];

const plugins = ({ prod }) => [
  resolve(),
  commonjs({
    include: 'node_modules/**',
  }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
  }),
  sourceMaps(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
  ...(prod ? prodPlugins : []),
];

const config = ({ prod = false, format = cjs } = {}) => {
  const devSuffix = prod ? '' : 'develop.';
  const prefix = `dist/walledator.${devSuffix}`;

  return {
    input: './src/index.js',
    output: [format({ file: `${prefix}cjs.js` })],
    plugins: plugins({ prod }),
    external: id => deps.some(d => id.startsWith(d)),
  };
};

export default [config(), config({ prod: true })];
