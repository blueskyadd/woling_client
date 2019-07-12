const state = {
    orderId:'',
    TotalPrice: '',//商品总价
  }
  const mutations = {
    setOrder(state, {orderID, orderPrice}) {
      state.orderId = orderID
      state.TotalPrice = orderPrice
    },
  }
  export default {
    state,
    mutations
  }
  