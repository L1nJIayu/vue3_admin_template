import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/ 
export default defineConfig({
  server: {
    port: 11180,
    proxy: {
      '/api': {
        target: 'http://192.168.0.17:28880/ubattery-operations-maintenance-admin',
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

