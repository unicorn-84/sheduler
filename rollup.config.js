const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const json = require('rollup-plugin-json');

const production = process.env.NODE_ENV === 'production';

module.exports = [
  {
    input: 'src/scheduler',
    output: {
      name: 'scheduler',
      file: production ? 'build/scheduler.min.js' : 'dev/scheduler.js',
      format: 'iife',
      sourcemap: !production,
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      production && terser(),
    ],
  },
];
