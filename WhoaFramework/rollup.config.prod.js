import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../dist/script/WhoaFramework.js',
            format: 'es'
        },
        plugins: [resolve(), terser(), typescript({ module: 'ESNext' })],
        onwarn(warning, warn) {
            if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message.includes('babylonjs')) return;
            warn(warning.message);
        }
    }
];
