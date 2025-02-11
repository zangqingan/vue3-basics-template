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





