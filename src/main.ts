/** @format */

import zhCn from 'element-plus/es/locale/lang/zh-cn';
/** @format */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import { createRouterGuard } from '@/guard';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/dark/css-vars.css';
import './styles/element/index.scss';
import { GlobalMount } from '@/public/GlobalMount';
import NProgress from 'nprogress'
import  'nprogress/nprogress.css';

ProgressConfig();
NProgress.start();
async function setupApp() {
  const app = createApp(App);
  // 使用pinia和ElementPlus
  app.use(createPinia());
  app.use(ElementPlus, {
    locale: zhCn,
  });
  // 加载路由
  createRouterGuard(app);
  // 注册elementplus图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  // 自定义权限指令
  // const permiss = usePermissionStore();
  // app.directive("permiss", {
  //   mounted(el, binding) {
  //     if (!permiss.key.includes(String(binding.value))) {
  //       el["hidden"] = true;
  //     }
  //   },
  // });
  // 挂载全局组件
  GlobalMount(app);
  app.mount('#app');
  NProgress.done();
}
setupApp();
document.title = import.meta.env.VITE_TITLE || '';
function ProgressConfig(){
  NProgress.configure({
    // 动画方式
    easing: 'ease',
    // 递增进度条的数据，单位ms，默认200
    speed: 500,
    // 是否显示加载ico
    showSpinner: false,
    // 是否自动递增
    trickle: true,
    // 自动地址间隔
    trickleSpeed: 200,
    //初始化时的百分比
    minimum: 0.3,
    // 指定此选项更改的父级容器
    parent: 'body'
  })
}

