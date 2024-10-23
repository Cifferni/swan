import { ServerOptions } from 'vite'

export type TServer = ServerOptions | undefined

export const createServer = (env: any): TServer => {
  return {
    host: '0.0.0.0',
    proxy: {
      '^/api/.*': {
        target: env.parsed.VITE_APP_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
}
