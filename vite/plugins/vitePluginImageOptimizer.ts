import { type Plugin } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
/**
 * 创建一个Vite插件实例，用于优化图像资源
 *
 * @returns {Function} 配置好的 ViteImageOptimizer 实例
 * 该实例将 JPEG 和 PNG 图像的质量设置为 50%，以减小文件大小并提高加载速度
 */
export const vitePluginImageOptimizer = (): Plugin<any> => {
  return ViteImageOptimizer({
    jpg: {
      quality: 50,
    },
    png: {
      quality: 50,
    },
  })
}
