const state = {
    logingData:{
        userName:'',
        
    }
  }
  const mutations = {
    changeclassSelfData(state, flag) {
      state.classSelfData = flag
    }
  }
  export default {
    state,
    mutations
  }
  