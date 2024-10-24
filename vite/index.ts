import { ConfigEnv, PluginOption } from 'vite'
import { createVitePlugins } from './plugins'
import { crateEsbuildConfig, type TEsBuild } from './esBuild'
import { createBuild, type TBuild } from './build'
import { createServer, type TServer } from './server'
export interface defaultConfigType {
  plugins: PluginOption[]
  esbuild: TEsBuild
  build: TBuild
  server: TServer
}

export function createViteConfig(
  { command, mode }: ConfigEnv,
  env: any,
): defaultConfigType {
  return {
    plugins: createVitePlugins({ command, mode }),
    esbuild: crateEsbuildConfig({ command, mode }),
    build: createBuild({ command, mode }),
    server: createServer(env),
  }
}
