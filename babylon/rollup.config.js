import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        file: '../dist/script/Babylon.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [resolve(), terser(), typescript({ module: 'ESNext' })],
    onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        if (warning.plugin === 'typescript' && warning.pluginCode === 'TS2339') return;
        warn(warning);
    }
};
