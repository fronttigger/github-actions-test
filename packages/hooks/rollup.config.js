import fs from 'fs'
import path from 'path'

import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const inputs = fs.readdirSync('./src', { withFileTypes: true }).reduce((config, f) => {
  if (f.isDirectory()) {
    const name = f.name
    const dir = `src/${name}`

    const files = fs.readdirSync(dir).reduce((result, file) => {
      if (file.match(/spec|test/i)) {
        return result
      }

      const filename = path.parse(file).name
      result[`${name}/${filename}`] = `${dir}/${file}`

      return result
    }, {})

    return { ...config, ...files }
  }

  return config
}, {})

const input = { ...inputs, index: './src/index.ts' }

export default [
  {
    input,
    output: [
      {
        dir: 'lib',
        format: 'cjs',
      },
    ],
    plugins: [
      peerDepsExternal(),
      babel({
        babelHelpers: 'bundled',
        exclude: /node_modules/,
        skipPreflightCheck: true,
      }),
      resolve(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
  {
    input,
    output: [
      {
        dir: 'lib/esm',
        format: 'esm',
      },
    ],
    plugins: [
      peerDepsExternal(),
      babel({
        babelHelpers: 'bundled',
        exclude: /node_modules/,
        skipPreflightCheck: true,
      }),
      resolve(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.esm.json' }),
    ],
  },
]
