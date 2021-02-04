import axios from '@/axios/product';

export default {
  namespaced: true,
  state(){
    return {
      products: []
    }
  },
  getters: {
    products(state) {
      return state.products
    }
  },
  mutations: {
    set(state, products) {
      state.products = products
    }
  },
  actions: {
    async get({commit}) {
      const {data} = await axios.get('/products')
      commit('set', data)
    }
  }
}