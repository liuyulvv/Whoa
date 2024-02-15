import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../dist/script/WhoaKernel.js',
            format: 'es'
        },
        plugins: [commonjs(), resolve(), terser(), typescript({ module: 'ESNext' })],
        onwarn(warning, warn) {
            if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message.includes('babylonjs')) return;
            warn(warning.message);
        }
    }
];
