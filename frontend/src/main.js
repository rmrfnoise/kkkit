import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import '@/assets/styles/main.css'
/* EP 主题变量覆盖依赖上面的设计 token，且必须晚于 EP 自身样式，
   故单独成文件放在最后导入 */
import '@/assets/styles/element-theme.css'

const app = createApp(App)
app.use(router)
app.mount('#app')