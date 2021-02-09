<template>
  <div class="products-table" v-if="products.length">
    <div class="product-card" v-for="product in products" :key="product.id" >
      <div class="product-img" @click="$router.push(`/product/${product.id}`)">
        <img :src="product.img">
      </div>
      <h4 class="product-title">{{product.title}}</h4>
      <div class="text-center">
      <product-counter :product="product" />
      </div>
    </div>
  </div>
  <div v-else class="container">
    <h3>Товаров не найдено</h3>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import AppPage from '@/components/ui/AppPage'
import ProductCounter from '@/components/product/ProductCounter'

export default {
  props: ['products'],
  components: {
    AppButton,
    AppPage,
    ProductCounter
  }
}
</script>

<style scoped>

</style>