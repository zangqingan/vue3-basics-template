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
Vue3、Vite、TypeScript、Pinia、VueRouter、axios、sass、VueUse

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
3. router 代表路由目录
4. store 代表状态管理目录
5. hooks 代表自定义 hook
6. utils 代表工具方法目录
7. types 代表 ts 类型定义目录


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
import '@/assets/styles/index.scss';
import { createApp } from 'vue';
import { initStore } from './store/init.ts';
import App from './App.vue';

/**
 * 定义一个函数用来启动Vue
 */
async function bootstrap() {
  const app = createApp(App);
  initStore(app);
  app.mount('#app');
}
bootstrap();

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
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

// 定义路由模块的类型
interface RouteModule {
  default: RouteRecordRaw;
}

// 获取 modules 目录下所有的路由配置项
/** 基础路由 */
const basicRoutes: Record<string, RouteModule> = import.meta.glob(['./modules/basics/**/*.ts'], {
  eager: true,
});
console.log('basicRoutes', basicRoutes);

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
import { initRouter } from './router/init'
import App from './App.vue'

/**
 * 定义一个函数用来启动Vue
 */
async function bootstrap() {
    const app = createApp(App)
    initRouter(app)
    app.mount('#app')
    
}
bootstrap() 


```


# 四、Vite 配置
Vite 是一种新型前端构建工具，能够显著提升前端开发体验，它主要由两部分组成：

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
| Syntax            | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| .env              | # 所有情况下都会加载                                        |
| .env.local        | # 所有情况下都会加载，但会被 git 忽略, 添加到 .gitignore 中 |
| .env.[mode]       | # 只在指定模式下加载                                        |
| .env.[mode].local | # 只在指定模式下加载，但会被 git 忽略, 添加到 .gitignore 中 |

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
```


# 五、代码规范配置
通过 ESLint + Prettier + Stylelint 实现代码风格规范、格式化，通过 EditorConfig 实现 IDE 编码风格规范化。
1. 代码层面(ESLint + Prettier + Stylelint)
2. IDE 层面(EditorConfig)

## 5.1 ESLint
ESLint 是一个 JavaScript 代码检查工具，帮助我们来确保代码风格一致，这对于团队协作来说是大有益处，也用来发现一些潜在错误或不规范的代码。ESLint 的规则是可配置的，因此可以根据团队偏好、项目需求来定义自己的 ESLint 规则
在 ESLint v9 之后发生了较大改变:
1. 对 NodeJS 版本的要求，不再支持 v18.18.0 和 v19 版本
2. 新的默认配置格式：eslint.config.js 和扁平化配置
3. 删除了大部分的格式化程序，更专注于代码质量
**安装 ESLint**
```bash
pnpm create @eslint/config@latest
How would you like to use ESLint?（您希望如何使用 ESLint）

To check syntax only（只检查语法）
To check syntax and find problems（检查语法并发现问题）√

What type of modules does your project use?（你的项目使用什么类型的模块？）

JavaScript modules (import/export) （JavaScript模块（导入/导出）√
CommonJS (require/exports) （CommonJS(需要/出口) ）
None of these （这些都不是）

Which framework does your project use?（您的项目使用哪个框架？）

React
Vue.js √
None of these （这些都不是）

Does your project use TypeScript?（你的项目使用TypeScript吗？）

No
Yes √

Where does your code run?（你的代码在哪里运行？）

Browser (浏览器) √
Node

Would you like to install them now?（您现在要安装它们吗？）

No
Yes √

Which package manager do you want to use？（您想使用哪个包管理器）

npm
yarn
pnpm √
bun
命令行配置选择完成后，会安装一些依赖到 devDependencies。
devDependencies:
+ @eslint/js 9.20.0  ESLint 的核心包，用于支持 JavaScript 的代码分析功能，适用于基于 JavaScript 的代码检查
+ eslint 9.20.1 ESLint 包
+ eslint-plugin-vue 9.32.0  专为 Vue 项目设计的 ESLint 插件，提供了对 Vue 特有语法（如模板、指令等）的代码检查和规则支持
+ globals 15.15.0 JavaScript 全局变量的库，提供常见的全局变量，通常用于 ESLint 配置中定义哪些全局变量是允许的
+ typescript-eslint 8.24.0 TypeScript 的 ESLint 插件，允许 ESLint 对 TypeScript 代码进行静态分析和代码检查




```
在项目根目录下，还会生成了一个 eslint.config.js 文件，它是新的默认配置格式。

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];
```

在编辑器如 VS Code 中集成 ESLint 插件，可以帮助你找出代码中不符合 ESLint 规则的地方，通过不同颜色下划线该告诉你错误信息、警告信息等，这很有用。ESLint 扩展会自动查找 ESLint 全局安装版本，在项目根目录下找到你的配置文件(eslint.config.js)
在 ESLint v9 之前，我们通过创建 .eslintignore 来忽略文件，在扁平化配置下，我们需要在 eslint.config.js 中配置 ignores 字段，它是一个字符串数组。

规则是 ESLint 的核心构建块。@eslint/js 包已经配置了大量规则pluginJs.configs.recommended，当然，你也可以在 rules 中覆盖这些规则来完成你的需要。


**使用 plugins 添加插件**

ESLint 插件是一个 npm 模块，可以包含一组 ESLint 规则、配置、处理器和环境。使用plugins属性对象配置。比如，Vue.js 的官方 ESLint 插件 eslint-plugin-vue。在新版的eslint安装中就会自动添加，不过并没有配置成插件，可以利用这个插件实现一个针对 Vue 单文件组件的 ESLInt 配置。

如果没有安装请先安装: `pnpm add eslint-plugin-vue --save-dev
`

这里还需要 vue-eslint-parser 插件 用于 .vue 文件的 ESLint 自定义解析器。
```bash
pnpm add vue-eslint-parser --save-dev
devDependencies:
+ vue-eslint-parser 9.4.3

```
然后，在 eslint.config.js 中配置
```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import parserVue from 'vue-eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  // .vue文件规则配置
  {
    files: ["**/*.vue"], 
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      }
    },
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-strongly-recommended'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,
      //...更多配置规则
    },
  },
  // 测试规则配置
  {
    files: ["src/main.ts"], //确定配置对象应用于哪些文件
    ignores: ["node_modules"], //确定应该忽略哪些文件
    rules: {
      "no-alert": "error", //禁止使用 alert、confirm 和 prompt
      "no-empty-function": "error", //禁止空函数
      "no-var": "error", //禁止使用var
    },
  },
  // 忽略检查文件
  {
    ignores: [
      "**/node_modules",
      "**/public",
      "**/assets",
      "**/dist",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/.history",
      "**/CHANGELOG*.md",
      "**/*.min.*",
      "**/LICENSE*",
      "**/__snapshots__",
      "**/auto-import?(s).d.ts",
      "**/components.d.ts",
    ],
  },
];
```

最后为了运行方便在实际项目中、我们会将命令写在 package.json 的 scripts。
```json
{
  "scripts": {
    "lint:eslint": "eslint --fix  --cache --max-warnings 0  \"src/**/*.{vue,ts,tsx}\"  --cache-location \"node_modules/.cache/eslint/\"",
  }
}

--max-warnings： 此选项允许您指定警告阈值，如果项目中存在过多的警告级别规则冲突，则该阈值可用于强制 ESLint 退出并显示错误状态
--fix： 指示 ESLint 尝试修复尽可能多的问题
--cache： 存储有关已处理文件的信息，以便仅对更改的文件进行操作。确保仅对更改的文件进行 linted 处理，从而显著提高 ESLint 的运行时性能
--cache-location： 缓存位置的文件或目录的路径，因为缓存会生成一个 .eslintcache 文件，不配置将在根目录下生成，我们这里统一处理放在 node_modules/.cache

在终端检查代码
pnpm lint:eslint

```


**在 Vite 中集成 ESLint 插件**、在 Vite 程序中检查 ESLint 的错误，并将其错误或警告输出在终端和页面上。需要vite-plugin-eslint 插件。
```bash
pnpm add vite-plugin-eslint --save-dev

devDependencies:
+ vite-plugin-eslint 1.8.1

```
然后在 vite.config.ts 中配置
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslint()],
});


```

## 5.2 Prettier
Prettier 是一个代码格式化工具，主要用于自动化代码的风格统一和格式化，专注于确保代码的可读性和一致性。
**安装**
```bash
pnpm add --save-dev --save-exact prettier
devDependencies:
+ prettier 3.5.1

```

配置 Prettier
在根目录下新增两个文件：
  .prettierignore 忽略文件，表示哪些文件忽略格式化
  .prettierrc.js Prettier 配置文件(ES Modules)

```js
// .prettierignore
sdist
public/*
src/assets/*

// .prettierrc.js
/** @type {import('prettier').Config} */
const config = {
  printWidth: 100, // 每行最大字符数
  tabWidth: 2, // 缩进空格数
  semi: true, // 尾部添加分号
  singleQuote: true, // 是否使用单引号而不是双引号
  bracketSpacing: true, // 在对象字面量的括号内添加空格
  arrowParens: 'always', // 总是为箭头函数的参数添加圆括号
  proseWrap: 'preserve', // 不改变 Markdown 文本的换行
  bracketSameLine: false,
};

export default config;


```

VS Code 中集成 Prettier 在 VS Code 扩展中搜索 Prettier 并进行安装、Prettier 扩展会自动查找项目根目录下的配置文件、忽略文件。同时将保存时格式化代码、且指定 Prettier 插件来格式化代码写进 settings.json 中


**Prettier 脚本命令配置**
```json
{
  "scripts": {
    "lint:format": "prettier  --write --cache \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\"",
  }
}

--write：这将就地重写所有已处理的文件。这与  eslint --fix  工作流程相当。您也可以使用  -w  别名。
--cache： 存储有关已处理文件的信息，以便仅对更改的文件进行操作

// 在终端来格式化代码
pnpm lint:format


```

**ESLint 和 Prettier 配合使用**、在 ESLint v9.0.0 前的格式化程序和 Prettier 起冲突，这里介绍两个依赖：
1. eslint-config-prettier：关闭所有不必要或可能与 Prettier 冲突的规则、在 ESLint v9 已经移除了多个内置的格式化规则，使其更专注于代码质量检查而非格式化。所有它的用武之地有所减少、但是一些广泛使用的 ESLint 插件可能仍然包含格式化相关的规则。如果是v9.0.0及以下版本，也还是需要使用。
2. eslint-plugin-prettier：将 Prettier 作为规则插入到 ESLint 里
   
对于那些还没移除的规则可以手动关闭或者继续使用 eslint-config-prettier 插件。这里我们只使用第二个。安装
```bash
pnpm add --save-dev eslint-plugin-prettier
devDependencies:
+ eslint-plugin-prettier 5.2.3


```

**配置**
```js
// eslint.config.js 
//...其他依赖
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  //...
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];

```

## 5.3 Stylelint
一个强大的 CSS 检测工具，可帮助您避免错误并执行约定。Stylelint 和 ESLint 很类似，都是定义规则、风格来进行代码检查，保证代码风格一致性，并发现一些潜在错误或不规范的代码。不同在于 Stylelint 针对的是 CSS 样式的代码检查。[官网](https://stylelint.io/)
**安装**
```js
pnpm add stylelint --save-dev
devDependencies:
+ stylelint 16.14.1

```

同时在 VS Code 扩展模块搜索 Stylelint 进行安装，并在 settings.json 文件中写入以下配置。
```json
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.fixAll.stylelint": "explicit",//配置 stylelint 保存自动修复
    },
    "stylelint.validate": ["css", "less", "scss", "sass", "postcss", "vue"]//插件检查范围


```

Stylelint 配置文件,在根目录下新建一个 stylelint.config.js 文件，同时确保你的 package.json 配置了 "type": "module"，表示使用 ESM 模块导出。同时在根目录下新建一个 .stylelintignore 文件用来忽略大量文件。Stylelint 配置项和eslint是类似的。

```js
// stylelint.config.js
/** @type {import('stylelint').Config} */
export default {
  // 扩展现有配置
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-html",
  ],
  // 自定义规则
  rules: {
    'block-no-empty': true, //禁止空块，比如 a{ }
  },
  // overrides 指定应用的文件
  overrides: [
    {
      files: ["*.less", "**/*.less"],
      customSyntax: "postcss-less",
	    extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue']
    },
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
      extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss"],
    },
  ]

};

// .stylelintignore
node_modules
dist
public
src/assets/*

// 对css文件校验-一般回集成命令到scripts脚本中。
npx stylelint "**/*.scss"

```

到这里css的检查设置其实已经完成、但是一般会使用社区已经发布的校验包喝自定义校验规则这时就需要如下依赖。

```js
pnpm add stylelint-config-standard stylelint-config-standard-scss --save-dev
devDependencies:
+ stylelint-config-standard 37.0.0
+ stylelint-config-standard-scss 14.0.0

pnpm add stylelint-config-recommended-vue stylelint-config-recess-order stylelint-config-html --save-dev
devDependencies:
+ stylelint-config-html 1.1.0
+ stylelint-config-recess-order 6.0.0
+ stylelint-config-recommended-vue 1.6.0

pnpm add postcss postcss-html postcss-scss --save-dev
# Less用 postcss-less，scss用 postcss-scss 
devDependencies:
+ postcss 8.5.3
+ postcss-html 1.8.0
+ postcss-scss 4.0.9



```
1. stylelint-config-standard：Stylelint 的 CSS 标准配置
2. stylelint-config-standard-scss：Stylelint 的标准可共享 SCSS 配置。
3. Scss：stylelint-config-recommended-scss：Stylelint 推荐的可共享 SCSS 配置
4. stylelint-config-recommended-vue：扩展 stylelint-config-recommended 配置，并提供推荐的 Vue 相关规则
5. stylelint-config-recess-order：对 CSS 属性进行排序
6. stylelint-config-html：此配置捆绑  postcss-html  自定义语法并对其进行配置
7. postcss：使用 JavaScript 转换 CSS 的工具
8. postcss-html: 用于解析 HTML（和类 HTML）的 PostCSS 语法，比如 Vue SFC 文件
9. Less：postcss-less：用于解析 Less 的 PostCSS 语法
10. Scss：postcss-scss： 用于解析 Scss 的 PostCSS 语法

上面的依赖中，除了可选的 Less 和 Scss 外，其余依赖建议全部安装(默认你使用 Vue 框架)，因为它们提供了一些有用的规则和配置。
 
**与 Prettier 配合**、在 Stylelint 中和 Prettier 类似也有两个包用来解决和Prettier的冲突问题。我们这个只安装后一个。注意，请确保你已经安装了 Stylelint 和 Prettier

```js
pnpm add stylelint-prettier --save-dev
devDependencies:
+ stylelint-prettier 5.0.3

```
1. stylelint-config-prettier，用于解决 Stylelint 和 Prettier 之间的规则冲突问题、现在已经不维护了，因为从 Stylelint v15 开始，所有与样式相关的格式规则都已被弃用，比如那些强制执行特定代码风格或格式的规则。所以要根据版本来确实是否需要。
2. stylelint-prettier，作为 Stylelint 规则运行 Prettier，并将差异报告为单独的 Stylelint 问题

然后在 stylelint.config.js 中配置

```js
/** @type {import('stylelint').Config} */

export default {
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
  },
};


```
最后stylelint 脚本命令配置

```json
{
  "scripts": {
    "lint:style": "stylelint --fix --max-warnings 0 --cache \"**/*.{css,scss,sass,vue}\" --cache-location \"ode_modules/.cache/stylelint/\""
  }
}
--fix：自动修复规则报告的问题
--max-warnings：设置接受的警告数量限制
--cache：存储已处理文件的结果，以便 Stylelint 仅对更改的文件进行操作
--cache-location：作用同 ESLint，将缓存文件放在 node_modules/.cache 下

pnpm lint:style

```


## 5.4 其它
EditorConfig 帮助我们在不同 IDE 编辑器中维持一致的编码风格和格式化规范，比如缩进，字符编码等。VS Code 本身不支持 EditorConfig，我们通过插件来使用。插件会在根目录下找到配置文件，读取 .editorconfig 文件中定义的规则，并覆盖工作区的对应配置。

**脚本命令聚合**
上面我们配置了 ESLint、Prettier、Stylelint的脚本命令，我们可以写一个聚合的命令，统一执行我们的三条脚本。注意这里的顺序，我们应该先格式化代码后再调用 ESLint，Stylelint 进行代码检查

```json
{
  "scripts": {
    "lint": "pnpm lint:format && pnpm lint:eslint && pnpm lint:style",
  }
}


```

**缓存文件删除**
在上面的 Eslint 和 Stylelint 命令中，会生成缓存文件，这些文件存在 node_modules/.cache 目录中，有些时候我们可以删除这些缓存，它的作用在于删除缓存会强制重新检查所有文件，而不是依赖可能过时的缓存结果。这里通过rimraf 是一个跨平台的删除工具，我们借助它来删除缓存文件
```js
pnpm add -D rimraf
devDependencies:
+ rimraf 6.0.1

// 在 package.json 的 scripts 中写入删除缓存文件脚本
  "scripts": {
    "clear:cache": "rimraf node_modules/.cache",
  }

// 然后就可以在终端执行命令来删除 node_modules/.cache 文件
pnpm clear:cache

```

**文件折叠**
ESLint、Stylelint、Prettier都有其配置文件及忽略文件等，可以在 VS Code 中写入配置来折叠它们，显得整洁
```json
{
  "explorer.fileNesting.enabled": true, //是否启用文件折叠
  "explorer.fileNesting.expand": false, //控制是否自动扩展文件嵌套
  "explorer.fileNesting.patterns": {
    "*.env": ".env.*",
    "eslint.config.js": ".prettierrc.*, stylelint.*, .editorconfig, .prettierignore, .stylelintignore",
    "package.json": "package-lock.json",
  },
  "files.autoSave": "onFocusChange",
  "compile-hero.disable-compile-files-on-did-save-code": true
}


```

# 六、Git 提交规范化
在团队合作中，Git 提交如果没有规范化，会让代码库变得混乱不堪，影响协作效率，特别是在多人协作中。如何从零开始搭建一套高效的 Git 提交规范化流程，是每个团队都需要思考的问题。这一节聚焦在工程层面，致力于从零搭建起一套 Git 提交规范化流程，通过工具如 Husky、Lint-staged、Commitlint 和 Commitizen，一步步实现 Git 提交规范化，主要分为 lint 校验和 Commit Message 规范化。简单理解就是git在提交时提供了各个阶段的钩子，由此用户可以定制提交的行为。

1. husky：一个 Git hook 工具，使用 Husky 可以挂载 Git 钩子，使现代的原生 Git 钩子变得简单，即可以帮助我们在 commit 前做一些自定义操作
2. Lint-staged： 对暂存的 git 文件运行 linters，也就是只对暂存的文件进行 ESLint、Prettier、Stylelint 等检查
3. commitlint：对 commit 信息进行检查，即 lint Commit Message
4. Commitizen：基于 Node.js 的  git commit  命令行工具，辅助生成标准化规范化的 Commit Message



## 6.1 git-hook
hook 翻译过来是钩子的意思，有点类似于 Vue 的生命周期钩子一样，Git 同样能在特定的重要动作发生时触发自定义脚本。执行 git init 命令后，会在当前目录下生成一个 .git 的隐藏文件，目录中就存在一个 hooks 文件夹，它里面存放着一些 shell 脚本(以 .sample 为后缀，表示默认不启动)。主要分为两大类：客户端和服务端，我们这里只关注客户端。在客户端下，也细分一些钩子种类，比如 提交工作流钩子、电子邮件工作流钩子和其它钩子等。常用如下：
1. pre-commit  钩子在键入提交信息前运行，所以可以在这里进行 lint 校验，比如 ESLint、Stylelint、Prettier 等。
2. commit-msg  存有当前提交信息的临时文件，如果该钩子脚本以非零值退出，Git 将放弃提交。对当前 Commit Message 进行检查并使用工具来规范化 Message 信息。

而为了实现在 git 钩子里去做这些事情，我们就需要借助工具 Husky 来配置 Git 钩子。

## 6.2 husky
Husky 是一个 Git hooks 工具，使用 Husky 可以挂载 Git 钩子，使现代的原生 Git 钩子变得简单，即它可以帮助我们在 Git 操作执行前或执行后自动执行脚本，从而实现 Git 提交的自动化。

**安装**
```js
pnpm add husky --save-dev
devDependencies:
+ husky 9.0.10

// init 初始化
pnpm exec husky init
  "scripts": {
    "prepare": "husky"
  },
```
`pnpm exec husky init`：这条命令会在根目录下新增一个 .husky 目录，目录下会创建  pre-commit  脚本并在  package.json  中生成一个名为 prepare 的脚本。现在就可以在 pre-commit 里键入提交信息前进行 lint 校验。

到这里我们要思考一个问题: 因为lint一般都是全局可能会耗费大量时间，那么有没有一个方案，只 lint 我当前修改的文件，而不是全量 lint ，这样就可以避免 lint 的耗时，提高效率且有针对性。也就是只对在暂存区的的文件进行 lint 校验，这就需要借助 lint-staged 来实现。Lint-staged 就是用来解决这样的问题的，帮助我们在暂存的文件上执行 lint，而不是对整个项目进行全量校验。这样可以显著减少 lint 校验的时间消耗，提高效率，并确保校验的针对性。

## 6.3 lint-staged
**安装**
```js
pnpm add lint-staged --save-dev
devDependencies:
+ lint-staged 15.2.11 

```
**配置**
lint-staged 安装完成后，我们需要来配置一下它，这个做法和 ESLint、Stylelint 等很像.可以通过多种方式来配置，一种普遍的方式是直接在 package.json 中配置，比如
```json
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.vue": [
      "prettier --write",
	  "eslint --fix",
      "stylelint --fix",
    ]
  },

```
还有种方式是在根目录下创建一个配置文件:lint-staged.config.js 这个文件默认导出一个对象(lint-staged 会自动找到这个配置文件)

```js
/** @type {import("lint-staged").Config} */
export default {
  "*.vue": ["prettier --write --cache", "eslint --fix", "stylelint --fix"],
  "*.{js,ts,jsx,tsx}": ["prettier --write --cache", "eslint --fix"],
  "*.{css,scss,less}": ["prettier --write --cache", "stylelint --fix"],
  "*.html": ["prettier --write --cache", "stylelint --fix"],
  "*.json": "prettier --write --cache",
};

```

接下来，我们需要确保 Git 钩子 pre-commit 能够正确调用 lint-staged。添加钩子是很简单的。
在根目录下的终端运行 shell 命令. echo后面是命令，表示把这个内容写入.husky目录下的pre-commit文件中。
```bash
echo "npm test" > .husky/pre-commit
echo "pnpm lint-staged" > .husky/pre-commit

```
之后把修改了的文件加入到缓存区，就可以使用git commit -m "提交测试"，测试是否配置成功。如果校验未通过，Commit 提交并未通过而是直接退出了。校验通过就提交了。

## 6.4 commit 规范
通过上面的设置我们已经实现了git提交时的lint检查，接下来是实现的提交信息的统一配置。不配置时我们都是通过git commit -m "提交信息"，这样的提交信息是不规范的。commit 规范的意义体现在几个方面：
1. 提高代码可读性和项目质量、改善项目可维护性
2. 简化协作和沟通
3. 方便版本管理和代码回溯
4. 有助于自动化生成变更日志

这里介绍两个commit提交规范
1. Angular 规范，由 Angular 团队制定并使用，也被社区广泛接受。
2. Conventional Commits 规范则是由 Angular 规范发展调整而来的一个更通用的规范，官网的介绍是：约定式提交，一种用于给提交信息增加人机可读含义的规范，提供一套规则来创建清晰的提交历史：

要让我们的提交信息能够符合 Conventional Commits 规范，可通过使用工具如 commitlint 来实现。



## 6.5 commitlint
Commitlint 是一个用于校验 Commit Message 的工具，它可以帮助我们在提交代码前检查 Commit Message 是否符合规范。
**安装**
```js
pnpm add --save-dev @commitlint/{cli,config-conventional}
devDependencies:
+ @commitlint/cli 19.8.0
+ @commitlint/config-conventional 19.8.0


```

1. @commitlint/cli，命令行工具.
2. @commitlint/config-conventional，此配置遵循 Conventional Commits 规范，与 @commitlint/cli 配合使用，

**配置**
1. 根目录下新建 commitlint.config.js 文件，导出一个对象，里面配置 Conventional Commits 规范
```js
/** @type {import('@commitlint/types').UserConfig} */ 
 export default { extends: ['@commitlint/config-conventional'] };
```
一个基本的提交约定遵循以下模式：
type(scope?): subject
body?
footer?


写完自定义的配置规则后，我们要在创建提交之前对其进行 lint 校验，需要使用到 Husky 的 commit-msg 钩子，commit-msg 概念：存有当前提交信息的临时文件，如果该钩子脚本以非零值退出，Git 将放弃提交。
运行 shell 命令`echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg`，将其写入.husky/commit-msg文件中。到这一步，我们已经实现了基本的 commit 信息校验。可以提交当前commit，查看lint 校验是否起作用。
```js
Progress: resolved 100, reused 79, downloaded 21, added 100, done
⧗   input: 测试
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```
可以看到，提交信息不符合规范，所以提交失败了。解决方法也很简单，修改 commit 信息使其符合规则即可。但是不友好，新人也不知道有哪些类型，所以最好是通过自动化程序来避免这种纯手敲 commit 信息格式的错误，也就是说通过工具来给我们提供交互式命令行界面，创建符合 Commitlint 规范的 Commit 信息。社区有这样的解决方案，通过 Commitizen 来辅助我们生成一套标准化规范化的 Commit 信息

## 6.6 Commitizen
Commitizen 是一个基于 Node.js 的 git commit 命令行工具，它可以帮助我们生成符合规范的 Commit 信息。
类似的工具有两个
1. @commitlint/prompt-cli 是官方提供的包，是 Commitlint 生态一部分，与 Commitlint 无缝衔接
2. Commitizen 拥有着更大的社区、更广泛的使用、更成熟，灵活及定制化
我们使用 Commitizen。
**安装**
```js
pnpm add --save-dev commitizen
devDependencies:
+ commitizen 4.3.1

```
安装完后，我们还需要安装一个适配器，这里介绍两个：
1. cz-conventional-changelog是 Commitizen 文档中介绍的适配器，也是广泛使用的适配器
2. @commitlint/cz-commitlint 是 Commitlint 官方提供的 Commitizen 适配器，提供了一种更现代的交互方式
这里使用 @commitlint/cz-commitlint 适配器
```js
pnpm add --save-dev @commitlint/cz-commitlint

devDependencies:
+ @commitlint/cz-commitlint 19.8.0

```


接着在 package.json 中写入以下内容：
```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  },
}

```
这样就可以通过命令 `git cz` 来启动交互式命令行界面，输入符合规范的 Commit 信息。

**配置**
在做完上述的安装及基础配置后，我们可以自定义自己的交互文本，在 commitlint.config.js 文件中配置 prompt 属性。最终文件内容如下：
```js
export default {
  ignores: [(commit) => commit === ''],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 | New feature
        'fix', // 修复bug | Bug fix
        'docs', // 文档更新 | Documentation updates
        'style', // 代码格式（不影响代码运行的变动） | Code formatting (changes that do not affect code execution)
        'refactor', // 重构（既不是新增功能，也不是修改bug的代码变动） | Refactoring (code changes that neither fix a bug nor add a feature)
        'perf', // 性能优化 | Performance improvements
        'test', // 增加测试 | Adding tests
        'chore', // 构建过程或辅助工具的变动等杂事、琐事 | Changes to the build process or auxiliary tools
        'revert', // 回滚到上一个版本 | Revert to a previous version
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 | Compilation-related changes, such as release versions or changes to project build or dependencies
        'types', // 类型 | Types
        'ci', // CI 配置文件和脚本的更改 | Changes to CI configuration files and scripts
      ],
    ],
    'header-max-length': [2, 'always', 100], // 头部最大长度100
    'body-max-line-length': [2, 'always', 100], // body最大长度100
    'footer-max-line-length': [2, 'always', 100], // footer最大长度100
    'type-empty': [2, 'never'], // type 不能为空
    'subject-empty': [2, 'never'], // subject 不能为空
    // "scope-empty": [2, "never"], // scope 不能为空
    'type-case': [2, 'always', 'lower-case'], // type 小写
    'scope-case': [2, 'always', ['lower-case', 'pascal-case']], // scope - lower case、PascalCase
    'subject-case': [0, 'always'], // subject 不显示大小写
  },
  // 选项对话
  prompt: {
    questions: {
      type: {
        description: "选择你要提交的变更类型 | Select the type of change you're committing",
        enum: {
          feat: {
            description: '新功能 | A new feature',
            title: 'Features | 功能',
            emoji: '✨',
          },
          fix: {
            description: '修复bug | A bug fix',
            title: 'Bug Fixes | 修复',
            emoji: '🐛',
          },
          docs: {
            description: '仅文档更改 | Documentation only changes',
            title: 'Documentation | 文档',
            emoji: '📚',
          },
          style: {
            description:
              '不影响代码含义的更改（空白、格式化、缺少分号等）| Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles | 样式',
            emoji: '💎',
          },
          refactor: {
            description:
              '既不修复bug也不添加新功能的代码更改 | A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring | 代码重构',
            emoji: '📦',
          },
          perf: {
            description: '提高性能的代码更改 | A code change that improves performance',
            title: 'Performance Improvements | 性能优化',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或修正现有的测试 | Adding missing tests or correcting existing tests',
            title: 'Tests | 测试',
            emoji: '🚨',
          },
          chore: {
            description: '构建过程或辅助工具的变动等杂事、琐事 | Changes to the build process or auxiliary tools',
            title: 'Chores | 杂务',
            emoji: '🔧',
          },
          revert: {
            description: '回滚到上一个版本 | Revert to a previous version',
            title: 'Reverts | 回滚',
            emoji: '⏪',
          },
          build: {
            description:
              '编译相关的修改，例如发布版本、对项目构建或者依赖的改动 | Changes that affect the build system or external dependencies',
            title: 'Builds | 构建',
            emoji: '🏗',
          },
          types: {
            description: '类型定义文件更改 | Changes to type definitions',
            title: 'Types | 类型',
            emoji: '🏷️',
          },
          ci: {
            description: 'CI 配置文件和脚本的更改 | Changes to CI configuration files and scripts',
            title: 'Continuous Integration | 持续集成',
            emoji: '🎡',
          },
        },
      },
      scope: {
        description:
          '变更的范围是什么（例如组件或文件名，可选）| What is the scope of this change (e.g. component or file name，optional)',
      },
      subject: {
        description:
          '写一个简短的、命令式的变更描述（必填） | Write a short, imperative tense description of the change（required）',
      },
      body: {
        description: '提供更长的变更描述（可选） | Provide a longer description of the change（optional）',
      },
      isBreaking: {
        description: '有什么重大变更吗？| Are there any breaking changes?',
      },
      breakingBody: {
        description:
          '重大变更提交需要一个正文。请输入提交本身的更长描述 | A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: '描述重大变更 | Describe the breaking changes',
      },
      isIssueAffected: {
        description: '此变更是否影响任何未解决的问题？| Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          '如果问题已关闭，提交需要一个正文。请输入提交本身的更长描述 | If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: '添加问题引用（例如 "fix #123", "re #123"）| Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};

```

至此提交信息格式化完成。测试一下`pnpm commit` 提交、出现交互式命令界面即为成功。











