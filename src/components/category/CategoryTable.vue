<template>
  <app-loader v-if="loading" />
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
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '@/components/ui/AppLoader'

export default {
  components: {AppLoader},
  setup() {
    const store = useStore()
    const loading = ref(true)

    onMounted(async () => {
      await useLoad()
      loading.value = false
    })

    return {
      loading,
      categories: computed(() => store.getters['product/categories'])
    }
  }
}
</script>

<style scoped>

</style>