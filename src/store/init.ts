// 配置 Pinia 及持久化
import { createPinia } from 'pinia';
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// 引入Vue应用实例ts类型
import type { App } from 'vue';

// 创建一个 pinia 实例 (根 store) 并将其传递给应用
const pinia = createPinia();

// 配置持久化-使用默认配置
pinia.use(piniaPluginPersistedstate);
/**
 * 创建一个函数用于初始化 pinia
 */
const initStore = (app: App<Element>) => {
  return app.use(pinia);
};

// 导出
export { pinia, initStore };
