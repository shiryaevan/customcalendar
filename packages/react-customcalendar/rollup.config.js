import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss';
import * as react from 'react';

export default {
  input: 'src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: 'ReactCustomcalendar',
  },
  plugins: [
		typescript(/*{ plugin options }*/),
    commonjs({
      namedExports: {
        react: Object.keys(react),
      },
    }),
    scss(),
	],
  external: ['react']
};
