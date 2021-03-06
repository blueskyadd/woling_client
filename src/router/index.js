import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

export default new Router({
  linkExactActiveClass:'active',
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'loging',
      component:() => import('@/view/loging/index'),
    },
    {
      path:'/changeChild',
      name:'changeChild',
      component:() => import('@/view/loging/changeChild.vue')
    },
    {
      path:'/index',
      name:'index',
      component:() => import('@/view/index/index')
    },
    {
      path:'/userinfo',
      name:'userinfo',
      component:() => import('@/view/userinfo/userinfo')
    },
    {
      path:'/cart',
      name:'cart',
      component:() => import('@/view/cart/index'),
    },
    {
      path:'/actively',
      name:'actively',
      component:() => import('@/view/actively/index')
    },
    {
      path:'/activelyDetail',
      name:'activelyDetail',
      component:() => import('@/view/actively/activelyDetail')
    },
    {
      path:'/coach',
      name:'coach',
      component:() => import('@/view/coach/index')
    },
    {
      path:'/medal',
      name:'medal',
      component:() => import('@/view/medal/index')
    },
    {
      path:'/achievement',
      name:'achievement',
      component:() => import('@/view/achievement/index')
    },
    {
      path:'/exercise',
      name:'exercise',
      component:() => import('@/view/exercise/index')
    },
    //订单管理
    {
      path:'/orderForm',
      name: 'orderForm',
      component:() => import('@/view/orderForm/index')
    },
    {
      path:'/ballPack',
      name:'ballPack',
      component:() => import('@/view/ballPack/index')
    },
    {
      path:'/map',
      name:'map',
      component:() => import('@/view/ballPack/map')
    },
    {
      path:'/shopping',
      name:'shopping',
      component:() => import('@/view/shopping/index'),
    },
    {
      path:'/puy',
      name: 'puy',
      component:() => import('@/components/puy')
    },
    {
      path:'/course',
      name:'course',
      component:() => import('@/view/course/timetable'),
    },
    {
      path:'/courtseDetail',
      name:'courtseDetail',
      component:() => import('@/view/course/courtseDetail'),
      
    },
    {
      path:'/audition',
      name:'audition',
      component:() => import('@/view/audition/index'),
    },
  ]
})
Router.prototype.routerBack = function () {
  store.commit("changeIsBack",true)
  this.back(-1)
}

const toStrings = function(from){
  var cache = [];
  return JSON.stringify(from, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
}
