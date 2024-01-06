import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
    output: {
        file: '../dist/script/WhoaGeometry.js',
        format: 'es'
    },
    plugins: [
        copy({
            targets: [{ src: 'wasm/*', dest: '../dist/script/' }]
        }),
        resolve(),
        terser(),
        typescript({ module: 'ESNext' })
    ],
    onwarn(warning) {
        if (warning.code === 'EMPTY_BUNDLE') return;
    }
};
