<template>
  <app-page title="Категории">
    <template #header>
      <app-button type="primary" @click="modal = true">Добавить</app-button>
    </template>
    <category-table />
  </app-page>
  <teleport to="body">
    <app-modal v-if="modal" title="Создать категорию" @close="modal = false">
      <category-form @created="modal = false"/>
    </app-modal>
  </teleport>
</template>

<script>
import {ref} from 'vue'
import AppButton from '@/components/ui/AppButton'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/modal/AppModal'
import ProductForm from '@/components/admin/product/ProductForm'
import CategoryTable from '@/components/admin/category/CategoryTable'
import CategoryForm from '@/components/admin/category/CategoryForm'

export default {
  setup() {
    const modal = ref(false)

    return {
      modal
    }
  },
  components: {
    CategoryForm,
    CategoryTable,
    ProductForm,
    AppButton,
    AppPage,
    AppModal
  }
}
</script>

<style scoped>

</style>