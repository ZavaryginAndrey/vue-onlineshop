<template>
  <app-page title="Категории">
    <template #header>
      <app-button type="primary" text="Добавить" disabled/>
    </template>
    <category-table />
  </app-page>
</template>

<script>
import {ref} from 'vue'
import AppButton from '@/components/ui/AppButton'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import ProductForm from '@/components/product/ProductForm'
import CategoryTable from '@/components/category/CategoryTable'

export default {
  setup() {
    const modal = ref(false)

    return {
      modal
    }
  },
  components: {
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