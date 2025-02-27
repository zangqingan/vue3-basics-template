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
