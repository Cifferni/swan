import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/store/index';
import router from '@/router';
import '@/utils/emitter';
import 'element-plus/es/components/message/style/css';
// tailwind样式
import '@/assets/styles/tailwind.css';
// 阿里云字体图标
import '@/assets/icon/iconFont/iconfont.css';
const app = createApp(App);
// 引入pinia
app.use(pinia);
// 路由
app.use(router);

app.mount('#app');
