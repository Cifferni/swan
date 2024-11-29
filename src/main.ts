import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store/index'
import router from '@/router'
import '@/utils/emitter'
import { i18n } from '@/i18n'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import '@/assets/theme/dark.scss'
import 'nprogress/nprogress.css'

// tailwind样式
import '@/assets/styles/tailwind.css'
// 阿里云字体图标
import '@/assets/icon/iconFont/iconfont.css'
// import '@/utils/rem'
const app = createApp(App)
// 引入pinia
app.use(pinia)
// 路由
app.use(router)
// 多语
app.use(i18n)
app.mount('#app')
