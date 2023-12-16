import copy from 'rollup-plugin-copy';

export default {
    input: 'src/index.ts',
    plugins: [
        copy({
            targets: [{ src: 'dist/*', dest: '../dist/script/' }]
        })
    ],
    onwarn(warning) {
        if (warning.code === 'EMPTY_BUNDLE') return;
    }
};
