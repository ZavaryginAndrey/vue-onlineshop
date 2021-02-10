import {reactive} from 'vue'

export default {
  namespaced: true,
  state() {
    return {
      cart: reactive({})
    }
  },
  getters: {
    cart(state) {
      return state.cart
    },
    cartItemsCount(state) {
      return Object.keys(state.cart).reduce((acc, key) => acc+state.cart[key], 0)
    }
  },
  mutations: {
    increaseProductCount: (state, id) => {
      state.cart[id] ? state.cart[id]++ : state.cart[id] = 1
    },
    decreaseProductCount: (state, id) => {
      state.cart[id] === 1 ? delete state.cart[id] : state.cart[id]--
    }
  },
  actions: {
    changeProductCount({commit}, {id, type}) {
      commit(type+'ProductCount', id)
    }
  }
}