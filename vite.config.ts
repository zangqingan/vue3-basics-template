import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression'; // 配置gzip压缩
import { visualizer } from 'rollup-plugin-visualizer'; // 配置打包分析可视化
import { resolve } from 'path'; // 配置路径别名
import eslint from 'vite-plugin-eslint'; // vite 集成eslint

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd(), '');
  console.log('env', env.VITE_APP_TITLE);

  return {
    plugins: [
      vue(),
      // 默认压缩gzip，生成 .gz文件
      viteCompression({
        deleteOriginFile: false, // 压缩后是否删除源文件
      }),
      // put it the last one
      visualizer({
        open: true, // build后，是否自动打开分析页面，默认false
        gzipSize: true, // 是否分析gzip大小
        brotliSize: true, // 是否分析brotli大小
        // filename: 'stats.html'//默认分析文件命名
      }),
      // eslint 配置
      eslint(),
    ],
    // 设置别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'src/types'),
      },
    },
    // css配置
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    // 打包配置-生产环境去除 console.log、debugger
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log'],
    },
    // 打包分包配置
    build: {
      chunkSizeWarningLimit: 1500, // 超出 chunk 大小警告阈值，默认500kb
      // Rollup 打包配置
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name]-[hash:8].js', // 入口文件名称
          chunkFileNames: 'assets/js/[name]-[hash:8].js', // 引入文件名名称
          assetFileNames: 'assets/[ext]/[name]-[hash:8][extname]', // 静态资源名称
        },
      },
    },
  };
});
