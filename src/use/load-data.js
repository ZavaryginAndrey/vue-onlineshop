import {useStore} from 'vuex'

export async function useLoadData() {
  const store = useStore()
  
  if (!store.getters['product/products'].length) {
    await store.dispatch('product/getProductList')
  }
  if (!store.getters['product/categories'].length) {
    await store.dispatch('product/getCategoriesList')
  }
}