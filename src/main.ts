import { createApp, nextTick } from 'vue'
import App from './App.vue'
import 'normalize.css'
import "@/assets/css/index.less"
import Router from "@/router/index"
import Pinia from "@/store/index"
// import ElementPlus from "element-plus"
// import 'element-plus/dist/index.css'
// 针对message和loading组件引入样式
import "element-plus/theme-chalk/el-message.css"
import registerIcons from "@/global/resiter-icons"
import useLoginStore from './store/login'
import { createAllDirective } from './directive'
const app = createApp(App)
app.use(Pinia)
app.use(registerIcons)
// app.use(ElementPlus)
// 加载本地缓存的数据
const loginSrore = useLoginStore()
loginSrore.loadLocalCache()
app.use(Router)
app.use(createAllDirective)


app.mount('#app')