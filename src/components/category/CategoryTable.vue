<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="category in categories">
      <td>{{category.id}}</td>
      <td>{{category.title}}</td>
      <td>{{category.type}}</td>
      <td>
        <button class="btn" disabled>
          Удалить
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {useLoad} from '@/use/load'
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore()
    onMounted(async () => await useLoad())


    return {
      categories: computed(() => store.getters['product/categories'])
    }
  }
}
</script>

<style scoped>

</style>