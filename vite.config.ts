/** @format */

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default ({ mode }) => {
  const configure = loadEnv(mode, process.cwd());
  const BASE_URL = configure.VITE_BASE_URL;

  return defineConfig({
    // 插件
    plugins: [
      vue(),
      // mock
      viteMockServe({
        supportTs: false,
        logger: false,
        mockPath: './src/mock',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, '/src'),
      },
    },
    // 配置代理
    server: {
      open: false,
      port: 8082,
      proxy: {
        [configure.VITE_BASE_URL]: {
          target: configure.VITE_APP_BASE_URL || '',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`${BASE_URL}`), ''),
        },
      },
    },
    define: {
      'process.env': process.env,
    },
    build: {
      // 打包文件夹位置
      outDir: 'an_ui',
      // 静态文件所在位置
      assetsDir: 'assets',
      // 混淆器
      minify: 'terser',
      terserOptions: {
        // 清除console等多余代码
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      //打包文件按照类型分文件夹显示
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          chunkFileNames: 'js/app-[hash].js',
          entryFileNames: 'js/app-[hash].js',
          assetFileNames: '[ext]/[ext]-[hash].[ext]',
        },
      },
    },
  });
};
