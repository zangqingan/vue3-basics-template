import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path" // 配置路径别名

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
