<template>
  <form @submit.prevent="onSubmit">
    <app-input v-model="title" label="Название" @blur="titleBlur" :error="titleError"/>
    <app-input v-model="type" label="Тип" @blur="typeBlur" :error="typeError"/>
    <app-button type="submit" :disabled="isSubmitting">Создать</app-button>
  </form>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useProductForm} from '@/use/product-form'
import AppInput from '@/components/ui/AppInput'
import AppButton from '@/components/ui/AppButton'

export default {
  emits: ['created'],
  setup(props, {emit}) {
    const store = useStore()
    const categories = computed(() => store.getters['product/categories'])

    const create = async values => {
      console.log(values)
      await store.dispatch('product/createCategory', values)
      emit('created')
    }

    return {
      ...useProductForm(create),
      categories
    }
  },
  components: {AppButton, AppInput}
}
</script>

<style scoped>

</style>