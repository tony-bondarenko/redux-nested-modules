import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';

import pkg from './package.json';

let isWatch = process.argv.includes('--watch');

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.module,
            format: 'es',
        },
        {
            file: pkg.main,
            format: 'cjs',
        },
    ],
    external: [...Object.keys(pkg.peerDependencies || {}), 'rxjs/operators'],
    plugins: [
        del(isWatch ? {} : {targets: 'dist/*'}),
        typescript({tsconfig: './tsconfig.json'}),
        nodeResolve(),
        commonjs(),
    ],
};
