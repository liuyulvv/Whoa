import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../dist/script/WhoaKernel.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [commonjs(), resolve(), typescript({ module: 'ESNext' })],
        onwarn(warning, warn) {
            if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message.includes('babylonjs')) return;
            warn(warning.message);
        }
    }
];
