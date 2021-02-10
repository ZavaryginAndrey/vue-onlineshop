<template>
  <app-loader v-if="loading"/>
  <app-page
    back
    center
    :title="product.title"
    v-else-if="product"
  >
    <img :src="product.img">
    <p>Категория: <strong>{{ category }}</strong></p>
    <product-counter type="in-card" :product="product"/>
  </app-page>
  <h3 class="text-center text-white" v-else>
    Товара не найден.
  </h3>
</template>

<script>
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {computed, onMounted, ref} from 'vue'
import {useLoadData} from '@/use/load-data'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import ProductCounter from '@/components/product/ProductCounter'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const loading = ref(true)
    const product = ref({})

    onMounted(async () => {
      await useLoadData()
      product.value = store.getters['product/products'].find(p => p.id === route.params.id)
      loading.value = false
    })

    const categories = computed(() => store.getters['product/categories'])
    const category = computed(() => categories.value.find(c => c.type === product.value.category))

    return {
      product,
      loading,
      category
    }
  },
  components: {
    AppPage,
    AppLoader,
    ProductCounter
  }
}
</script>

<style scoped>

</style>