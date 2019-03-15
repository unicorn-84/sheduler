import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'scheduler',
      file: process.env.ROLLUP_WATCH ? 'public/scheduler.js' : 'build/scheduler.min.js',
      format: 'iife',
      sourcemap: process.env.ROLLUP_WATCH,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      !process.env.ROLLUP_WATCH && terser(),
    ],
  },
];
