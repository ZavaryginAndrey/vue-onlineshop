<template>
  <form @submit.prevent="onSubmit">
    <app-input v-model="title" label="Название" @blur="titleBlur" :error="titleError"/>
    <app-input v-model="type" label="Тип" @blur="typeBlur" :error="typeError"/>
    <app-button :disabled="isSubmitting">Создать</app-button>
  </form>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useCategoryForm} from '@/use/category-form'
import AppInput from '@/components/ui/AppInput'
import AppButton from '@/components/ui/AppButton'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()
    const categories = computed(() => store.getters['product/categories'])

    const create = async values => {
      await store.dispatch('product/createCategory', values)
      emit('created')
    }

    return {
      ...useCategoryForm(create),
      categories
    }
  },
  components: {AppButton, AppInput}
}
</script>

<style scoped>

</style>