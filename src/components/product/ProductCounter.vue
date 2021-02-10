<template>
    <h4 v-if="isOutOfStock">Товара нет в наличии</h4>
    <app-button v-else-if="!cartCount" @action="add">{{ currency(product.price) }}</app-button>
    <div :class="['product-controls', type]" v-else>
      <app-button
        type="primary"
        :disabled="cartCount === product.count"
        @action="add"
      >+
      </app-button>
      <strong>{{ cartCount }}</strong>
      <app-button type="danger" @action="remove">-</app-button>
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