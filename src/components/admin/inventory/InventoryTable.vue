<template>
  <app-loader v-if="loading" />
  <table class="table" v-else>
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Изображение</th>
      <th>Категория</th>
      <th>Количество</th>
      <th>Цена</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(product, idx) in paginate(products, 5, $route.query.page)" :key="product.id">
      <td>{{idx + 1}}</td>
      <td>{{product.title}}</td>
      <td>
        <img :src="product.img">
      </td>
      <td>{{categories.find(el => el.type === product.category).title}}</td>
      <td>{{product.count}}</td>
      <td>{{product.price}}</td>
      <td>
        <button class="btn" @click="$router.push('/admin/product/'+product.id)">Открыть</button>
      </td>
    </tr>
    </tbody>
  </table>
  <pagination
    v-model="page"
    :pageSize="pageSize"
    :itemsCount="products.length"
  />
</template>

<script>
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {computed, onMounted, ref, watch} from 'vue'
import {useLoadData} from '@/use/load-data'
import AppLoader from '@/components/ui/AppLoader'
import Pagination from '@/components/ui/AppPagination';
import {paginate} from "@/utils/pagination";

export default {
  components: {Pagination, AppLoader},
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(true)
    const page = ref(+route.query.page || 1)

    onMounted(async () => {
      await useLoadData()
      await router.replace({query: {page: page.value}})
      loading.value = false
    })

    watch(page, () => {
      router.replace({query: {page: page.value}})
    })

    return {
      pageSize: process.env.VUE_APP_PAGE_SIZE,
      loading,
      page,
      paginate,
      categories: computed(() => store.getters['product/categories']),
      // products: computed(() => paginate(store.getters['product/products'],process.env.VUE_APP_PAGE_SIZE, route.query.page))
      products: computed(() => store.getters['product/products'])
    }
  }
}
</script>

<style scoped>

</style>