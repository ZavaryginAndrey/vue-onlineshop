import axios from '@/axios/product';

export default {
  namespaced: true,
  state(){
    return {
      products: [],
      categories: []
    }
  },
  getters: {
    products(state) {
      return state.products
    },
    categories(state) {
      return state.categories
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    addProduct(state, product) {
      state.products.push(product)
    }
  },
  actions: {
    async getProductList({commit}) {
      const {data} = await axios.get('/products?count_gte=1')
      const {data: outOfStock} = await axios.get('/products?count=0')
      data.push(...outOfStock)
      commit('setProducts', data)
    },
    async getCategoriesList({commit}) {
      const {data} = await axios.get('/categories')
      commit('setCategories', data)
    },
    async create({commit, getters}, product) {
      const {data} = await axios.post('/products', product)
      commit('addProduct', {...product, id: data.id})
    }
  }
}