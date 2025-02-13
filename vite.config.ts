import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from "vite-plugin-compression" // 配置gzip压缩
import { visualizer } from "rollup-plugin-visualizer" // 配置打包分析可视化
import { resolve } from "path" // 配置路径别名

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //默认压缩gzip，生成 .gz文件
    viteCompression({
      deleteOriginFile: false, //压缩后是否删除源文件
    }),
    // put it the last one
    visualizer({
      open: true, //build后，是否自动打开分析页面，默认false
      gzipSize: true, //是否分析gzip大小
      brotliSize: true, //是否分析brotli大小
      //filename: 'stats.html'//默认分析文件命名
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
