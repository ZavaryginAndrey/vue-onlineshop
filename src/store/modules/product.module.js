import axios from '@/axios/firebase';

export default {
  namespaced: true,
  state(){
    return {
      products: [],
      categories: []
    }
  },
  getters: {
    product: state => id => {
      return state.products.find(p => p.id === id)
    },
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
    },
    addCategory(state, category) {
      state.categories.push(category)
    }
  },
  actions: {
    async getProductList({commit}) {
      const {data} = await axios.get('/products.json')
      // firebase возвращает массив с уникальными id, приходится парсить
      const unsortedProducts = Object.keys(data).map(key => {
        return {id: key, ...data[key]}
      })
      
      const sortedProducts = unsortedProducts
        .filter(p => p.count)
        .concat(unsortedProducts.filter(p => !p.count))
      
      commit('setProducts', sortedProducts)
    },
    async getCategoriesList({commit}) {
      const {data} = await axios.get('/categories.json')
      // firebase возвращает массив с уникальными id, приходится парсить
      const categories = Object.keys(data).map(key => {
        return {id: key, ...data[key]}
      })
      
      commit('setCategories', categories)
    },
    async create({commit, getters}, product) {
      const {data} = await axios.post('/products.json', product)
      commit('addProduct', {...product, id: data.id})
    },
    async createCategory({commit, getters}, category) {
      const {data} = await axios.post('/categories.json', category)
      commit('addCategories', {...category, id: data.id})
    },
    async remove({commit, getters}, id) {
      await axios.delete(`/products/${id}.json`)
      commit('setProducts', getters.products.filter(p => p.id !== id))
    },
    async removeCategory({commit, getters}, id) {
      await axios.delete(`/categories/${id}.json`)
      commit('setCategories', getters.categories.filter(p => p.id !== id))
    },
    async update({commit, getters}, product) {
      const {data} = await axios.put(`/products/${product.id}.json`, product)
      console.log(data)
    }
  }
}