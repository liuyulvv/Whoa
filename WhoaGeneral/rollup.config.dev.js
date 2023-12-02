import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../dist/script/WhoaGeneral.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            commonjs(),
            resolve({
                browser: true
            }),
            json(),
            typescript({ module: 'ESNext' })
        ]
    }
];
