import { ConfigEnv, BuildOptions } from 'vite';
export type TBuild = BuildOptions | undefined;
export const createBuild = ({ mode }: ConfigEnv): TBuild => {
  const defaultBuildConfig: TBuild = {
    chunkSizeWarningLimit: 500,
    sourcemap: true,
    rollupOptions: {
      // external: ['vue'],
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          // 静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  };
  if (mode === 'production') {
    defaultBuildConfig.sourcemap = false;
  }
  return defaultBuildConfig;
};
