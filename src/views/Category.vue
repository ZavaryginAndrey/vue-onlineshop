<template>
  <app-page title="Категории">
    <template #header>
      <app-button type="primary" text="Добавить" @click="modal = true"/>
    </template>
    <category-table />
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <product-form />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import ProductForm from '@/components/product/ProductForm'
import CategoryTable from '@/components/category/CategoryTable';
import {ref} from 'vue';

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