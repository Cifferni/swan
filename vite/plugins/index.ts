import { vitePluginMock } from './viteMockServe'
import { rollupVisualizerPlugin } from './rollupPluginVisualizer'
import { vitePluginImageOptimizer } from './vitePluginImageOptimizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { type ConfigEnv, type PluginOption } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginCompression } from './viteCompression'
/**
 * 根据当前环境模式创建并返回Vite插件数组
 * 此函数会根据项目的不同运行模式（如开发、测试、生产）来决定需要引入哪些插件
 *
 * @param {ConfigEnv} envConfig - 包含命令和模式的配置环境对象
 * @returns {Array<PluginOption>} vitePlugins - Vite插件数组，根据环境模式添加了不同插件
 */
export const createVitePlugins = ({ command, mode }: ConfigEnv) => {
  const vitePlugins: Array<PluginOption> = [
    vue(),
    vitePluginImageOptimizer(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
  if (mode === 'development') {
    vitePlugins.push(vitePluginMock(command))
    vitePlugins.push(rollupVisualizerPlugin())
  }
  if (mode === 'test') {
    vitePlugins.push(vitePluginMock(command))
    // vitePlugins.push(rollupVisualizerPlugin());
  }
  if (mode === 'production') {
    vitePlugins.push(rollupVisualizerPlugin())
    vitePlugins.push(vitePluginCompression())
  }

  return vitePlugins
}
