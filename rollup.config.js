import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'scheduler',
      file: production ? 'build/scheduler.min.js' : 'dev/scheduler.js',
      format: 'iife',
      sourcemap: !production,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      production && terser(),
    ],
  },
];
