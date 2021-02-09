<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="product in products" :key="product.id">
      <td>
        {{product.title}}
        <br />
        <img :src="product.img" style="max-height: 80px;">
      </td>
      <td>
        <product-counter :product="product" />
      </td>
      <td>{{ currency(product.price) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {useStore} from 'vuex'
import {currency} from '@/utils/currency'
import AppButton from '@/components/ui/AppButton'
import ProductCounter from '@/components/product/ProductCounter'

export default {
  props: ['products', 'cart'],
  setup() {
    const store = useStore()
    const cart = store.getters['cart/cart']

    return {
      cart,
      currency
    }
  },
  components: {
    AppButton,
    ProductCounter
  }
}
</script>

<style scoped>

</style>