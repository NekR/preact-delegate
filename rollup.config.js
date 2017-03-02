import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  external: ['preact'],
  exports: 'named',
  format: 'cjs',
  sourceMap: false,

  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};