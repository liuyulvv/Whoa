import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        file: '../dist/server.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [resolve(), commonjs(), terser(), json(), typescript({ module: 'ESNext' })],
    onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
    }
};
