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

## 4.3 环境变量
环境变量。顾名思义，在不同环境下呈现不同的变量值。Vite 在特殊的 import.meta.env 对象下暴露了一些常量。这些常量在开发阶段被定义为全局变量，并在构建阶段被静态替换，以使树摇（tree-shaking）更有效。
注意: 由于任何暴露给 Vite 源码的变量最终都将出现在客户端包中，VITE_* 变量应该不包含任何敏感信息。

**内置变量**、vite已经命名好的在所有情况下都可用。
1. import.meta.env.MODE: {string} 应用运行的模式、development 表示开发模式，生产环境是 production。
2. import.meta.env.BASE_URL: {string} 部署应用时的基本 URL、默认为 /。他由 base 配置项决定。
3. import.meta.env.PROD: {boolean} 应用是否运行在生产环境（使用 NODE_ENV='production' 运行开发服务器或构建应用时使用 NODE_ENV='production' ）、在生产环境，这个值是 true。
4. import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)、在生产环境，这个值为 false。
5. import.meta.env.SSR: {boolean} 应用是否运行在 server 上、如果使用 SSR，服务器端运行时这个值是 true。

**自定义变量**、在配置文件中 Vite 自动将环境变量暴露在 import.meta.env 对象下，作为字符串。同时为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。如果想要自定义环境变量的前缀，在 vite.config.ts 中设置 envPrefix 选项。
```js
// 配置文件 .env
VITE_SOME_KEY=123
DB_PASSWORD=foobar

console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
// 只有 VITE_SOME_KEY 会被暴露为 import.meta.env.VITE_SOME_KEY 提供给客户端源码，而 DB_PASSWORD 则不会。
```

想要自定义环境变量，首先先创建几个环境变量存放的文件，一般是放在根目录下。Vite 是通过使用 dotenv 从你的 环境目录 中加载这些配置文件。
| Syntax      | Description |
| ----------- | ----------- |
|.env                |# 所有情况下都会加载|
|.env.local          |# 所有情况下都会加载，但会被 git 忽略, 添加到 .gitignore 中|
|.env.[mode]         |# 只在指定模式下加载|
|.env.[mode].local   |# 只在指定模式下加载，但会被 git 忽略, 添加到 .gitignore 中|

1. .env 文件，表示通用的环境变量，优先级较低，会被其他环境文件覆盖
2. .env.development 文件，表示开发环境下的环境变量
3. .env.staging 预发布环境 一般与生产环境无异，只是 url 变化
4. .env.testing 测试环境
5. .env.production 文件，表示生产环境下的环境变量

在默认情况下，运行的脚本 dev 命令(pnpm dev)是会加载 .env.developmen 中的环境变量 而脚本 build 命令是加载 .env.production 中的环境变量。想在 vite build 时运行不同的模式来渲染不同的标题，你可以通过传递 --mode 选项标志来覆盖命令使用的默认模式。

```json
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",// 默认就是生产构建-等价于 --mode production
    "build:prod": "vue-tsc -b && vite build --mode production",
    "build:dev": "vue-tsc -b && vite build --mode development",
    "build:staging": "vue-tsc -b && vite build --mode staging",
    "preview": "vite preview"
  },
```

TS 智能提示: 默认情况下，Vite 在 vite/client.d.ts 中为 import.meta.env 提供了类型定义。随着在 .env[mode] 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示。在使用 pnpm create vite 创建项目时在scr下自动创建了一个 vite-env.d.ts 文件。

编辑器内折叠文件、在根目录下新建一个 .vscode 文件夹，在此文件夹中新增 settings.json 文件，写入以下配置：
```json
{
  "explorer.fileNesting.enabled": true, // 是否开启文件嵌套，默认 false
  "explorer.fileNesting.expand": false, // 是否默认展开
  "explorer.fileNesting.patterns": { // 文件嵌套规则
    "*.env": ".env.*"
  }
}

```

最后是如何使用、在 vite.config.ts 中使用环境变量如下:

```js
import { defineConfig, loadEnv } from 'vite'
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有
  // `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
```

## 4.4 css配置
Vite 提供了一个 css.preprocessorOptions 选项，用来指定传递给 CSS 预处理器选项：css-preprocessoroptions
```js
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import viteCompression from "vite-plugin-compression" // 配置gzip压缩
import { visualizer } from "rollup-plugin-visualizer" // 配置打包分析可视化
import { resolve } from "path" // 配置路径别名

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env);
  
  return {
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
    },
    // css配置
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@import  "@/styles/_variable.scss" as *;`,
        }
      }
    },
  }
})

```

## 4.5 打包配置
生产环境去除 console.log、debugger(esbuild 模式)
```js
//vite.config.ts
import type { UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [vue()],

    esbuild: {
      drop: ["debugger"],
      pure: ["console.log"],
    },
  };
};

```

## 4.6 分包策略
分包策略，就是根据不同的规则和逻辑来分割成大大小小的包，把一些固定，常规不更新的文件，进行分割切包处理、分包是一种优化程序加载速度，性能的策略和操作。
分包策略的作用在于：

1. 减少代码体积和加载时间: 当你的项目包含多个模块或者依赖项时，将它们分割成多个包可以减少单个包的体积。并且只重新加载修改的文件，减少加载时间
2. 提高缓存利用率:处理部分包而不是全部，分包可以提高浏览器的缓存命中率，从而减少不必要的网络请求，加快页面加载速度
3. 优化资源结构: 对于大型项目或者复杂的应用程序，通过合理划分功能模块和依赖项，有利于管理项目的整理结构和维护

**分包策略根据项目不同，会呈现出不同的策略**、常见如下:
1. 按功能或模块分包
2. 按页面或路由分包
3. 按第三方依赖分包
4. 公共代码分包
5. 按环境分包

**实现**、它是在 build.rollupOptions  构建选项中自定义底层的 Rollup 打包配置。
```js

```





















