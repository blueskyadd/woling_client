// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import 'swiper/dist/css/swiper.css';
import '../src/assets/style/public.scss'
import '../src/assets/style/comment.scss';//vux公共样式
import './components/Toast/toast.css';
import Toast from './components/Toast/index';
import {ProgressBar} from 'vue-ydui/dist/lib.rem/progressbar';
Vue.use(Toast);
// import VConsole from "vconsole";
import conf from "./config/index.js";
import http from "./track/http.js";
import RouteTransition from 'vue-route-transition'
import 'vue-ydui/dist/ydui.base.css';
window.Hls = require('hls.js');

Vue.use(RouteTransition)
Vue.component(ProgressBar.name, ProgressBar);
if (process.env.NODE_ENV === 'production') {
  // new VConsole()
}
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
