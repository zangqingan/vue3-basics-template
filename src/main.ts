import '@/assets/styles/index.scss'
import { createApp } from 'vue'
import { initStore } from '@/store/init'
import { initRouter } from '@/router/init'
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
