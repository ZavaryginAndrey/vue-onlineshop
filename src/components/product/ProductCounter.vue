<template>
    <h4 v-if="isOutOfStock">Товара нет в наличии</h4>
    <app-button v-else-if="!cartCount" :text="currency(product.price)" @action="add"/>
    <div :class="['product-controls', type]" v-else>
      <app-button
        type="primary"
        text="+"
        :disabled="cartCount === product.count"
        @action="add"/>
      <strong>{{ cartCount }}</strong>
      <app-button type="danger" text="-" @action="remove"/>
    </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {currency} from '@/utils/currency'
import AppButton from '@/components/ui/AppButton'

export default {
  props: ['product', 'type'],
  setup(props) {
    const store = useStore()
    const cart = store.getters['cart/cart']
    const id = props.product.id



    return {
      currency,
      isOutOfStock: computed(() => !props.product.count),
      cartCount: computed(() => cart[id]),
      add() {
        store.dispatch('cart/changeProductCount', {id, type: 'increase'})
      },
      remove() {
        store.dispatch('cart/changeProductCount', {id, type: 'decrease'})
      }
    }
  },
  components: {
    AppButton
  }
}
</script>

<style scoped>

</style>