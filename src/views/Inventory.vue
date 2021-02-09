<template>
  <app-page title="Инвентарь">
    <template #header>
      <app-button type="primary" text="Добавить" @click="modal = true"/>
    </template>
    <InventoryTable />
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <product-form @close="modal = false"/>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref} from 'vue'
import AppButton from '@/components/ui/AppButton'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import ProductForm from '@/components/product/ProductForm'
import InventoryTable from '@/components/inventory/InventoryTable'

export default {
  setup() {
    const modal = ref(false)

    return {
      modal
    }
  },
  components: {
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