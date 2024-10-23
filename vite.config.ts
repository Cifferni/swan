import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import * as dotenv from 'dotenv';
import { createViteConfig } from './vite/index';
export default defineConfig(({ mode, command }) => {
  //获取当前环境的Env
  const env = dotenv.config({ path: `./env/.env.${mode}` });
  if (!env.parsed) {
    throw new Error('Failed to parse .env file');
  }

  const { plugins, build, esbuild, server } = createViteConfig({ command, mode }, env);
  return {
    base: './',
    envDir: './env',
    plugins,
    esbuild,
    server,
    build,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/layout.scss";'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
});
