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
    <tr v-for="(product, idx) in products" :key="product.id">
      <td>{{idx + 1}}</td>
      <td>{{product.title}}</td>
      <td>
        <img :src="product.img" style="max-height: 80px">
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
</template>

<script>
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'
import {useLoadData} from '@/use/load-data'
import AppLoader from '@/components/ui/AppLoader'
import Pagination from '@/components/ui/AppPagination';

export default {
  components: {Pagination, AppLoader},
  setup() {
    const store = useStore()
    const loading = ref(true)
    onMounted(async () => {
      await useLoadData()
      loading.value = false
    })

    return {
      loading,
      categories: computed(() => store.getters['product/categories']),
      products: computed(() => store.getters['product/products'])
    }
  }
}
</script>

<style scoped>

</style>