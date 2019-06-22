const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps');
const camelCase = require('lodash.camelcase');
const typescript = require('rollup-plugin-typescript2');
const json = require('rollup-plugin-json');
const pkg = require('./package.json');
const libraryName = 'bdd-expand';

module.exports = {
    input: `src/${libraryName}.ts`,
    output: [
        { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true },
    ],
    external: [],
    watch: {
        include: 'src/**',
    },
    plugins: [
        json(),
        typescript({ useTsconfigDeclarationDir: true }),
        commonjs(),
        resolve(),
        sourceMaps(),
    ],
};
