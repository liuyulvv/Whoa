import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/entry.ts',
    output: {
        file: '../dist/script/entry.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [resolve(), terser(), typescript({ module: 'ESNext' })],
    onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
    }
};
