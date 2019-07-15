// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'


import '../src/assets/style/public.scss';//初始化样式
import "../src/assets/style/AllStyle.scss";
import '../src/assets/style/comment.scss';//vux公共样式
import './components/Toast/toast.css';//弹框样式

import Toast from './components/Toast/index';//弹框
import {ProgressBar} from 'vue-ydui/dist/lib.rem/progressbar';//加载环形图
import {CountUp} from 'vue-ydui/dist/lib.rem/countup';
Vue.component(ProgressBar.name, ProgressBar);
Vue.component(CountUp.name, CountUp);




import RouteTransition from 'vue-route-transition'
import 'vue-ydui/dist/ydui.base.css';
window.Hls = require('hls.js');


Vue.use(Toast);
Vue.use(RouteTransition)


/**@name接口请求 */
import conf from "./config/index.js";
import http from "./track/http.js";



//vconsole
import VConsole from "vconsole";//vconsole
if (process.env.NODE_ENV === 'production') {
  new VConsole()
}

//原型定义
Vue.prototype.$http = http
Vue.prototype.$conf = conf
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
