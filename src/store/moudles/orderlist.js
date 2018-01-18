import Vue from 'vue'
const state = {
  orderList: [],
  params: {}
}
const getters = {
  // getters可以直接使用state
  getOrderList: (state) => state.orderList
}
const actions = {
  // 这里需要解构获取commit和state
  fetchOrderList ({commit, state}) {
    // json-server不支持post Vue.http.post("/api/getOrderList",state.params)
    Vue.http.get('/api/getOrderList', state.params).then((res) => {
      commit('updateOrderList', res.data.list)
    }, (err) => {
      console.log(err)
    })
  }
}
const mutations = {
  updateOrderList (state, orderList) {
    state.orderList = orderList
  },
  updateParams (state, paramsObj) {
    state.params = paramsObj
  }
}
export default {
  // 数据集
  state,
  // 获取数据集
  getters,
  // 异步获取数据
  actions,
  // 同步更新数据集
  mutations
}
