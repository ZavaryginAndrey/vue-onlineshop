<template>
  <app-loader v-if="loading"/>
  <app-page v-else title="Корзина">
    <h3 class="text-center" v-if="isEmpty">В корзине пока ничего нет</h3>
    <cart-table :products="cartProducts" v-else></cart-table>
    <hr>
    <p class="text-right"><strong>Всего: {{ currency(total) }}</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </app-page>
</template>

<script>
import {onMounted, ref, computed} from 'vue'
import {useStore} from 'vuex'
import {currency} from '@/utils/currency'
import {useLoad} from '@/use/load'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import CartTable from '@/components/cart/CartTable'

export default {
  setup() {

    const store = useStore()
    const loading = ref(true)
    const cart = store.getters['cart/cart']

    onMounted(async () => {
      await useLoad()
      loading.value = false
    })

    const cartProducts = computed(() => store.getters['product/products']
      .filter(product => Object.keys(cart).includes(product.id)))

    return{
      loading,
      cartProducts,
      currency,
      isEmpty: computed(() => Object.keys(cart).length === 0),
      total: computed(() => cartProducts.value.reduce((acc, product) => acc + product.price*cart[product.id], 0)),
    }
  },
  components: {
    AppLoader,
    AppPage,
    CartTable
  }
}
</script>

<style scoped>

</style>