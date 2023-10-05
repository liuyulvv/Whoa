import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

const GLOBAL = `const process = {
    env: {
        NODE_ENV: 'production'
    }
};`;

export default {
    input: 'src/main.tsx',
    output: {
        file: '../dist/script/WhoaUI.js',
        format: 'es',
        sourcemap: true,
        banner: GLOBAL
    },
    plugins: [
        resolve(),
        commonjs(),
        terser(),
        json(),
        postcss(),
        typescript({ module: 'ESNext' }),
        copy({
            targets: [{ src: 'public/index.html', dest: '../dist/' }]
        })
    ],
    onwarn(warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        warn(warning);
    }
};
