<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="filterName">
      <span class="form-control-clear" @click="filterName = ''">&times;</span>
    </div>

    <ul class="list">
      <product-category
        text="Все"
        :active="!filterCategory"
        @categoryChose="filterCategory = ''"
      />
      <product-category
         v-for="category in categories"
        :text="category.title"
        :key="category.id"
        :active="filterCategory === category.type"
        @categoryChose="filterCategory = category.type"
      />
    </ul>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import ProductCategory from '@/components/category/CategoryChose'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()
    const filterName = ref('')
    const filterCategory = ref(route.query.category)

    onMounted(async () => {
      if (!store.getters['product/categories'].length) {
        await store.dispatch('product/getCategoriesList')
      }
      filterName.value = route.query.search
      filterCategory.value = route.query.category
    })

    watch([filterName, filterCategory], value => {
      emit('update:modelValue', {name: value[0], category: value[1]})
    })

    return {
      filterName,
      filterCategory,
      categories: computed(() => store.getters['product/categories'])
    }
  },
  components: {
    ProductCategory
  }
}
</script>

<style scoped>

</style>