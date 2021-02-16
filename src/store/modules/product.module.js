import axios from '@/axios/firebase';
import router from '@/router';

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
      const categories = Object.keys(data).map(key => {
        return {id: key, ...data[key]}
      })
      
      commit('setCategories', categories)
    },
    async create({commit, dispatch}, product) {
      const {data} = await axios.post('/products.json', product)
      commit('addProduct', {...product, id: data.name})
      dispatch('setMessage', {
        value: `Продукт ${product.title} добавлен`,
        type: 'primary'
      }, {root: true })
    },
    async createCategory({commit, dispatch}, category) {
      const {data} = await axios.post('/categories.json', category)
      commit('addCategory', {...category, id: data.id})
      dispatch('setMessage', {
        value: `Категория ${category.title} добавлена`,
        type: 'primary'
      }, {root: true })
    },
    async remove({commit, dispatch, getters}, id) {
      const productTitle = getters.products.find(p => p.id === id).title
      await axios.delete(`/products/${id}.json`)
      commit('setProducts', getters.products.filter(p => p.id !== id))
      await router.replace({path: '/admin/products'})
      dispatch('setMessage', {
        value: `Продукт ${productTitle} удалён`,
        type: 'primary'
      }, {root: true })
    },
    async removeCategory({commit, dispatch, getters}, id) {
      const category = getters.categories.find(c => c.id === id)
      if (getters.products.find(p => p.category === category.type)) {
        dispatch('setMessage', {
          value: `Категория ${category.title} не пустая`,
          type: 'danger'
        }, {root: true})
      } else {
        await axios.delete(`/categories/${id}.json`)
        commit('setCategories', getters.categories.filter(p => p.id !== id))
        await router.replace({path: '/admin/products'})
        
        dispatch('setMessage', {
          value: `Категория ${category.title} удалена.`,
          type: 'primary'
        }, {root: true})
      }
    },
    async update({commit, dispatch}, product) {
      const {data} = await axios.put(`/products/${product.id}.json`, product)
      dispatch('setMessage', {
        value: `Продукт ${data.title} обновлён`,
        type: 'primary'
      }, {root: true})
      
      return data
    }
  }
}