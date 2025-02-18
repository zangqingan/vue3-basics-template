import '@/assets/styles/index.scss'
import { createApp } from 'vue'
import { initStore } from './store/init.ts'
import { initRouter } from './router/init.ts'
import App from './App.vue'
const a = 10
alert(a)
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
