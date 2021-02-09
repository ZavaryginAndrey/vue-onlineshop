import {reactive} from 'vue'

const CART_MODEL = {
  '2': 3,
  '5': 1,
  '7': 8
}

export default {
  namespaced: true,
  state() {
    return {
      cart: reactive(CART_MODEL)
    }
  },
  getters: {
    cart(state) {
      return state.cart
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