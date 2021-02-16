import {useStore} from 'vuex'

export async function useLoadData() {
  const store = useStore()
  
  if (!store.getters['product/products'].length) {
    await store.dispatch('product/getProductList')
  }
  if (!store.getters['product/categories'].length) {
    await store.dispatch('product/getCategoriesList')
  }
  if (!store.getters['auth/role'] && store.getters['auth/token']) {
    const id = store.getters['auth/userLocalId']
    if (id) {
      const role = await store.dispatch('auth/getUserRole', id)
      store.commit('auth/setRole', {id, role})
    }
  }
}