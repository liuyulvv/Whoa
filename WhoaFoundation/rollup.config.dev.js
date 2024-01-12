import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../dist/script/WhoaFoundation.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [commonjs(), json(), resolve({ browser: true }), typescript({ module: 'ESNext' })]
    }
];
