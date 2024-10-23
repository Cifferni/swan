import importToCDN from 'vite-plugin-cdn-import'
import { type Plugin } from 'vite'
export const vitePluginCdnImport = (): Plugin[] => {
  return importToCDN({
    modules: [
      {
        name: 'vue',
        var: 'Vue',
        path: 'https://cdn.jsdelivr.net/npm/vue@3.5.8/dist/vue.global.prod.js',
      },
    ],
  })
}
