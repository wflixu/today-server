import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    cors: true,
    proxy: {
      '^/api/.*': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/fallback/, '')
      }
    }
  },
  build:{
    outDir:'app/public/',
    assetsDir:'site'
  },
  // publicDir:'/public',
  base:'/public/',

})
