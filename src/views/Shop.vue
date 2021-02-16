<template>
  <app-loader v-if="loading"/>
  <div class="card">
    <product-filter v-model="filter" />
    <product-table :products="products" />
  </div>
</template>

<script>
import {computed, onMounted, watch, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {useLoadData} from '@/use/load-data'
import ProductTable from '@/components/product/ProductTable'
import ProductFilter from '@/components/product/filter/Filter'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const filter = ref({})
    const loading = ref(true)

    onMounted(async () => {
      await useLoadData()
      loading.value = false
      document.title = 'Магазинчик'
    })

    watch(filter, filter => {
      const query = {}
      if (filter.name) {
        query.search = filter.name
      }
      if (filter.category) {
        query.category = filter.category
      }
      router.replace({query})
    })

    const products = computed(() => store.getters['product/products']
        .filter(p => {
          if (filter.value.name) {
            return p.title.toLowerCase().includes(filter.value.name.toLowerCase())
          }
          return p
        })
        .filter(p => {
          if (filter.value.category) {
            return p.category === filter.value.category
          }
          return p
        })
    )

    return {
      loading,
      filter,
      products
    }
  },
  components: {
    AppLoader,
    AppPage,
    ProductFilter,
    ProductTable
  }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>