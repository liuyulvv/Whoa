import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/index.ts',
    output: {
        file: '../dist/script/WhoaGeometry.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        copy({
            targets: [{ src: 'dist/*', dest: '../dist/script/' }]
        }),
        commonjs(),
        resolve(),
        typescript({ module: 'ESNext' })
    ],
    onwarn(warning) {
        if (warning.code === 'EMPTY_BUNDLE') return;
    }
};
