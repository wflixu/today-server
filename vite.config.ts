import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), copyBuildFiles()],
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
  
})

function copyBuildFiles():PluginOption {
  
  return {
    name: 'copy-build-files', // 必须的，将会显示在 warning 和 error 中
    apply: 'build' ,
    closeBundle(){
      console.warn('buildend');
      const fse = require('fs-extra');
      console.log('pwd',__dirname)
      fse.copy('./dist/index.html', './app/view/home.hbs', err => {
        if (err) return console.error(err)
        console.log('success!')
      })
      fse.copy('./dist/assets', './app/public/assets', err => {
        if (err) return console.error(err)
        console.log('success!')
      })
   
      
    }
  }
}
