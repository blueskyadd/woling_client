import Vue from 'vue'
import Vuex from 'vuex'
import routerState from './moudles/routerStart'
import evalation from './moudles/evalation'
import cart from './moudles/cart'


Vue.use(Vuex)

export default new Vuex.Store({
  state:{

  },
  modules:{
    routerState,
    evalation,
    cart
  },
  mutations:{

  },
  actions:{

  }


})

