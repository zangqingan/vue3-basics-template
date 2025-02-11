import './style.css'
import { createApp } from 'vue'
import { initStore } from './store/init'
import App from './App.vue'

/**
 * 定义一个函数用来启动Vue
 */
async function bootstrap() {
    const app = createApp(App)
    initStore(app)
    app.mount('#app')
    
}
bootstrap() 
