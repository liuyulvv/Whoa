import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default [
    {
        input: 'index.ts',
        plugins: [
            typescript({ module: 'ESNext' }),
            copy({
                targets: [
                    { src: 'imgs/*', dest: '../dist/assets/imgs/' },
                    { src: 'models/*', dest: '../dist/assets/models/' }
                ]
            })
        ],
        onwarn() {
            return;
        }
    }
];
