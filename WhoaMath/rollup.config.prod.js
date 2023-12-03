import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../dist/script/WhoaMath.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [resolve(), terser(), typescript({ module: 'ESNext' })]
    }
];
