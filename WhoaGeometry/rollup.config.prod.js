import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/index.ts',
    output: {
        file: '../dist/script/WhoaGeometry.js',
        format: 'es'
    },
    plugins: [
        copy({
            targets: [{ src: 'wasm/*', dest: '../dist/script/' }]
        }),
        commonjs(),
        resolve(),
        terser(),
        typescript({ module: 'ESNext' })
    ],
    onwarn(warning) {
        if (warning.code === 'EMPTY_BUNDLE') return;
    }
};
