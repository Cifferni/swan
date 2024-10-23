import { type Plugin } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
/**
 * 创建一个Vite插件，用于开发环境中的mock服务
 *
 * 此函数根据传入的命令生成一个Vite插件，该插件在特定的命令下启用mock服务主要用于开发环境，
 * 以便开发者可以模拟API响应，从而无需依赖真实的后端服务
 *
 * @param command 当前的命令状态，用于判断是否启用mock服务
 * @returns 返回一个Vite插件，用于在开发环境中提供mock服务
 */

export const vitePluginMock = (command: string): Plugin<any> => {
  return viteMockServe({
    mockPath: 'mock',
    enable: command === 'serve', // 只有开发环境才开启mock
    logger: false,
  })
}
