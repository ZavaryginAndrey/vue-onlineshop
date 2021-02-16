<template>
  <form @submit.prevent="onSubmit">
    <app-input
      v-model="title"
      label="Название"
      @blur="titleBlur"
      :error="titleError"
    />
    <app-input
      v-model="img"
      label="Изображение"
      @blur="imgBlur"
      :error="imgError"
    />
    <div class="form-control">
      <label>Категория</label>
      <select v-model="category">
        <option v-for="c in categories" :value="c.type">{{c.title}}</option>
      </select>
      <small if v-if="categoryError">{{categoryError}}</small>
    </div>
    <app-input
      v-model.number="count"
      label="Количество"
      type="number"
      @blur="countBlur"
      :error="countError"
    />
    <app-input
      v-model.number="price"
      label="Цена"
      type="number"
      @blur="priceBlur"
      :error="priceError"
    />
    <app-button :disabled="isSubmitting">Создать</app-button>
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

    const create = async values => {
      console.log(values)
      await store.dispatch('product/create', values)
      emit('created')
    }

    return {
      ...useProductForm(create),
      categories: computed(() => store.getters['product/categories'])
    }
  },
  components: {AppButton, AppInput}
}
</script>

<style scoped>

</style>