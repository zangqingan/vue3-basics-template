# 一、前言
这是一个最基础的项目、从零开始构建各种所需功能。比如工程化中如何搭起一套代码风格规范，如何形成一套Git提交规范等。

**项目创建**
```bash
# Windows
# 版本信息
$ node -v
v20.10.0
$ npm -v
10.2.3
$ pnpm -v
10.3.0
# 创建项目
$ pnpm create vite
√ Project name: ... basics
√ Select a framework: » Vue
√ Select a variant: » TypeScript

```
node下载:[官网](https://nodejs.org/en/download) 

使用 pnpm 安装最基础的 Vue 3 + TypeScript + Vite项目、此时可以看到package.json文件的依赖只有vue3和ts相关的。

```json
{
  "name": "basics",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite", // 运行
    "build": "vue-tsc -b && vite build",// 构建
    "preview": "vite preview" // 预览
  },
  "dependencies": {
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1", //  Vite 官方提供用于支持 Vue 3 单文件组件的编译和处理
    "@vue/tsconfig": "^0.7.0", // 专为 Vue 项目设计的 TypeScript 配置扩展工具，主要用于提供与 Vue 生态系统高度兼容的默认 TypeScript 配置
    "typescript": "~5.7.2",
    "vite": "^6.1.0",
    "vue-tsc": "^2.2.0" // 专门为 Vue.js 项目设计的 TypeScript 编译器工具，它是 TypeScript 命令行工具 tsc 的增强版本，用于支持 Vue 单文件组件（SFC）的类型检查和类型声明文件生成
  }
}

```

# 二、技术栈
vue3全家桶、而且是和ui框架无关的。我们只安装一下常用的。
Vue 3、Vite、TypeScript、Pinia、Vue Router、axios、sass、VueUse

**安装**
```bash
pnpm add pinia 
pnpm add vue-router@4
pnpm add axios
pnpm add @vueuse/core
pnpm add sass -D


```
上述依赖安装完成之后 package.json 如下
```json
{
  "name": "basics",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vueuse/core": "^12.5.0",
    "axios": "^1.7.9",
    "pinia": "^2.3.1",
    "vue": "^3.5.13",
    "vue-router": "4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/tsconfig": "^0.7.0",
    "sass": "^1.84.0", // 增加了一个sass依赖
    "typescript": "~5.7.2",
    "vite": "^6.1.0",
    "vue-tsc": "^2.2.0"
  }
}

```

目录结构设计及命名比如:
1. components 代表全局公共组件目录
2. views 代表页面目录
3. store 代表状态管理目录
4. hooks 代表自定义 hook
5. utils 代表工具方法目录
6. types 代表 ts 类型定义目录


# 三、Pinia 和 Vue Router 配置 

## 3.1 Pinia 配置
Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。官网: [Pinia](https://pinia.vuejs.org/zh/)、
持久化，顾名思义，保持数据持久不消失。要实现 pinia 数据持久化，我们需要借助 pinia-plugin-persistedstate 插件
**安装**
```bash
pnpm add pinia-plugin-persistedstate
```
**使用**
创建 src/store 目录，表示这个目录下的内容都是与存储相关。在目录下新建 init.ts 文件和 modules 文件夹。
1. init.ts 作为基础文件，用于注册 Pinia 和 Pinia 的基本配置
2. modules 文件夹下存放的是 Store 文件，比如 user.ts 、locale.ts 等存储文件

```js
// init.ts
// 配置 Pinia 及持久化
import { createPinia } from 'pinia'
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 引入Vue应用实例ts类型
import type { App } from 'vue'

// 创建一个 pinia 实例 (根 store) 并将其传递给应用
const pinia = createPinia()

// 配置持久化-使用默认配置
pinia.use(piniaPluginPersistedstate)
/**
 * 创建一个函数用于初始化 pinia
 */
const initStore  = (app: App<Element>) => {
    return app.use(pinia)
}

// 导出
export {
    pinia,
    initStore
}

// main.ts 中运行

```

## 3.2 Vue Router 配置 
Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用 (SPA) 变得轻而易举。

**使用**
创建一个 src/router 目录，表示这个目录下的内容都是与路由相关。
新建 init.ts 文件、index.ts 文件 和 modules 文件夹
1. init.ts 用于 Router 的注册和基本配置
2. index.ts 用于对 modules 下的路由做处理，比如自动导出
3. modules 文件夹下存放的是全部路由配置文件，这里是把路由配置都单独建立一个文件

```js
// init.ts
import { createRouter, createWebHashHistory  } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { routes } from './index' // 路由配置项

// 导出路由实例对象
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * 初始化路由函数
 */
const initRouter = (app: App<Element>) => {
    app.use(router)
}
// 导出
export {
    router,
    initRouter
}

// index.ts
// import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

// 获取 modules 目录下所有的路由配置项
/** 基础路由 */
const basicRoutes: Record<string, any> = import.meta.glob(['./modules/basics/**/*.ts'], {
  eager: true,
});
console.log("basicRoutes",basicRoutes);

// 遍历路由配置项，将路由添加到 routes 数组中
for (const key in basicRoutes) {
  const route = basicRoutes[key].default;
  routes.push(route);
}
// Object.keys(basicRoutes).forEach((key) => {
//   routes.push(basicRoutes[key].default);
// });
// 导出
export { routes };

// modules/basics/home.ts
import type { RouteRecordRaw } from 'vue-router';

const Home: RouteRecordRaw = {
  path: '/',
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../../../views/home/index.vue'),
    },
  ],
};

export default Home;

// views/home/index.vue
<script setup lang="ts">
import { useUserStore } from '../../store';
const userStore = useUserStore();
const { increment } = userStore;
</script>

<template>
   <div>
      <div>Home</div>
      <div>pinia: {{ userStore.count }}</div>
      <button type="button" @click="increment">change pinia</button>
  </div>
</template>

<style  lang="scss"  scoped>

</style>

// App.vue配置出口
<script setup lang="ts">

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>

// main.ts 配置初始化
import './style.css'
import { createApp } from 'vue'
import { initStore } from './store/init'
import { initRouter } from './router/init'
import App from './App.vue'

/**
 * 定义一个函数用来启动Vue
 */
async function bootstrap() {
    const app = createApp(App)
    initStore(app)
    initRouter(app)
    app.mount('#app')
    
}
bootstrap() 


```


# 四、Vite 配置
ite 是一种新型前端构建工具，能够显著提升前端开发体验，它主要由两部分组成：

1. 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热替换（HMR）。
2. 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

在 Vite 中，你可以使用 Vue 、 React 、 Svelte 、 Preact 、 Lit 、 Solid 、 Alpine 、 Hyperapp 、 Stimulus 、 Mithril 、 Vue 3 等框架。

## 4.1 配置别名
首先安装为 Node.js 提供类型定义的包，也是解决 "找不到模块 path 或其相对应的类型声明" 问题。对于js项目则不需要。

**安装**
```bash
pnpm add @types/node -D
pnpm add @types/node --save-dev
devDependencies:
+ @types/node 22.13.1

```

在 vite.config.ts 中配置 resolve.alias ，使用 @ 符号代表 src。如果是ts项目还需要在tsconfig.json 中配置。
```js
//  vite.config.ts
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

// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".", //使用相对路径，当前根目录
    "paths": {
      "@/*": ["src/*"],
    }
  }
}

```

## 4.2 vite插件
若要使用一个插件，需要将它添加到项目的 devDependencies 并在 vite.config.js 配置文件中的 plugins 数组中引入它。具体可查看官网[Vite插件](https://cn.vitejs.dev/plugins/)。常用的如下:

1. 配置gzip 压缩打包、安装 vite-plugin-compression 包。[官网](https://github.com/vbenjs/vite-plugin-compression)

**安装**
```bash
pnpm add vite-plugin-compression --save-dev
pnpm add vite-plugin-compression -D
devDependencies:
+ vite-plugin-compression 0.5.1

```

**配置**注意: 想使用 gzip 压缩来优化项目，还需要在 nginx 中开启 gzip 并进行相关配置，这一步交给后端来处理。
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from "vite-plugin-compression" // 配置gzip压缩
import { resolve } from "path" // 配置路径别名

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //默认压缩gzip，生成 .gz文件
    viteCompression({
      deleteOriginFile: false, //压缩后是否删除源文件
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})

```

2. 打包分析可视化、安装 rollup-plugin-visualizer 包。[官网](https://github.com/btd/rollup-plugin-visualizer)
   
**安装**
```bash
pnpm add rollup-plugin-visualizer -D
devDependencies:
+ rollup-plugin-visualizer 5.14.0

```


**配置**注意: 使用命令 pnpm build 构建后，分析图 html 文件会在根目录下生成，默认命名为 stats.html可以自己修改。一般也会把分析文件加入 .gitignore ，不提交到 git 仓库中。
```js
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

```

3. 打包分析可视化、安装 rollup-plugin-visualizer 包。[官网](https://github.com/vbenjs/vite-plugin-compression)
   
**安装**
```bash
pnpm add rollup-plugin-visualizer -D

```


**配置**
```js

```

4. 打包分析可视化、安装 rollup-plugin-visualizer 包。[官网](https://github.com/vbenjs/vite-plugin-compression)
   
**安装**
```bash
pnpm add rollup-plugin-visualizer -D

```


**配置**
```js

```