import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../dist/script/WhoaGeometry.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            resolve(),
            terser(),
            typescript({ module: 'ESNext' }),
            copy({
                targets: [
                    { src: 'wasm/dist/WhoaGeometryWASM.js', dest: '../dist/script/' },
                    { src: 'wasm/dist/WhoaGeometryWASM.d.ts', dest: '../types/WhoaGeometry/' },
                    { src: 'wasm/dist/WhoaGeometryWASM.wasm', dest: '../dist/script/' }
                ]
            })
        ]
    }
];
