import { createApp } from 'vue'
import store from './store';
import { router } from './router';
import Antd ,{ Layout,Menu,Button,Upload} from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";

import "./style.css";
import App from './App.vue'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.mount('#app')
