import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { routes } from './index'; // 路由配置项

// 导出路由实例对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 初始化路由函数
 */
const initRouter = (app: App<Element>) => {
  app.use(router);
};
// 导出
export { router, initRouter };
