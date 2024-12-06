import { type Plugin } from 'vite'
import viteCompression from 'vite-plugin-compression'

export const vitePluginCompression = (): Plugin => {
  return viteCompression({
    verbose: true, // 默认即可
    disable: false, // 开启压缩(不禁用)，默认即可
    deleteOriginFile: true, // 删除源文件
    threshold: 5120, // 压缩前最小文件大小
    algorithm: 'gzip', // 压缩算法
    ext: '.gz', // 文件类型
  })
}
