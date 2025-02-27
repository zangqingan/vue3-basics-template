// / <reference types="vite/client" />
// 环境变量-类型提示
interface ImportMetaEnv {
  /** 全局标题 */
  readonly VITE_APP_TITLE: string;
  /** 本地开发-端口号 */
  readonly VITE_DEV_PORT: number;
  // 加入更多环境变量...
}
