<template>
  <app-page title="Инвентарь">
    <template #header>
      <app-button type="primary" @click="modal = true">Добавить</app-button>
    </template>
    <InventoryTable />
    <teleport to="body">
      <app-modal v-if="modal" title="Создать продукт" @close="modal = false">
        <product-form @created="modal = false"/>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref} from 'vue'
import AppButton from '@/components/ui/AppButton'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/modal/AppModal'
import Pagination from '@/components/ui/AppPagination'
import ProductForm from '@/components/admin/product/ProductForm'
import InventoryTable from '@/components/admin/inventory/InventoryTable'

export default {
  setup() {
    const modal = ref(false)

    return {
      modal
    }
  },
  components: {
    Pagination,
    ProductForm,
    AppButton,
    AppPage,
    AppModal,
    InventoryTable
  }
}
</script>

<style scoped>

</style>