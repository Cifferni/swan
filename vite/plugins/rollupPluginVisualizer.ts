import { type Plugin } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
/**
 * 创建并返回一个用于Rollup构建可视化分析的插件
 *
 * 此函数无参数，返回一个配置好的Plugin对象
 * 它的作用是生成一个HTML文件，该文件包含构建 bundle 的详细统计信息
 * 这对于分析和优化构建过程非常有用
 *
 * @returns {Plugin} 一个配置好的用于生成Rollup构建可视化分析的插件
 */

export const rollupVisualizerPlugin = (): Plugin => {
  return visualizer({
    open: true,
    filename: 'stats.html',
    emitFile: false
  });
};
