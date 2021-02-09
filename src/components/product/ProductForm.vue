<template>
  <form @submit.prevent="create" action="submit">
    <app-input v-model="product.title" label="Название"/>
    <app-input v-model="product.img" label="Изображение"/>
    <div class="form-control">
      <label>Категория</label>
      <select v-model="product.category">
        <option v-for="c in categories" :value="c.type">{{c.title}}</option>
      </select>
    </div>
    <app-input v-model="product.count" label="Количество"/>
    <app-input v-model="product.price" label="Цена"/>
<!--  TODO: добавить валидацию useForm  -->
    <app-button @click="$emit('close')" text="Создать" :disabled="true"/>
  </form>
</template>

<script>
import {computed, reactive} from 'vue'
import {useStore} from 'vuex'
import AppInput from '@/components/ui/AppInput'
import AppButton from '@/components/ui/AppButton'

export default {
  setup() {
    const store = useStore()
    const product = reactive({})
    const categories = computed(() => store.getters['product/categories'])

    function create() {
      store.dispatch('product/create', product)
    }

    return {
      product,
      create,
      categories
    }
  },
  components: {AppButton, AppInput}
}
</script>

<style scoped>

</style>