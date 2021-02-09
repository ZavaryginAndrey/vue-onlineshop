<template>
  <table class="table">
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
    <tr v-for="product in products">
      <td>{{product.id}}</td>
      <td>{{product.title}}</td>
      <td>
        <img :src="product.img" style="max-height: 80px">
      </td>
      <td>{{product.category}}</td>
      <td>{{product.count}}</td>
      <td>{{product.price}}</td>
      <td>
        <button class="btn" disabled>
          Открыть
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useLoad} from '@/use/load'

export default {
  setup() {
    const store = useStore()
    useLoad()

    return {
      products: computed(() => store.getters['product/products'])
    }
  }
}
</script>

<style scoped>

</style>