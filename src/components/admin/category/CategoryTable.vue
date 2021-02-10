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
    <tr v-for="(category, idx) in categories" :key="category.id">
      <td>{{idx + 1}}</td>
      <td>{{category.title}}</td>
      <td>{{category.type}}</td>
      <td>
        <app-button
          type="danger"
          @click="categoryToRemove = category.id; confirm = true"
        >
          &times;
        </app-button>
      </td>
    </tr>
    </tbody>
  </table>
  <teleport to="body">
    <app-confirm
      v-if="confirm"
      message="Хочешь удалить?"
      @confirm="removeCategory"
      @reject="confirm = false"
    />
  </teleport>
</template>

<script>
import {useLoadData} from '@/use/load-data'
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AppButton from '@/components/ui/AppButton'
import AppConfirm from '@/components/ui/modal/AppConfirm'

export default {
  components: {AppConfirm, AppButton, AppLoader},
  setup() {
    const store = useStore()
    const loading = ref(true)
    const confirm = ref(false)
    const categoryToRemove = ref('')

    onMounted(async () => {
      await useLoadData()
      loading.value = false
    })

    return {
      loading,
      confirm,
      categoryToRemove,
      removeCategory() {
        confirm.value = false
        store.dispatch('product/removeCategory', categoryToRemove.value)
      },
      categories: computed(() => store.getters['product/categories'])
    }
  }
}
</script>

<style scoped>

</style>