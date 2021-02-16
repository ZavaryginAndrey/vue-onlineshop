<template>
  <app-loader v-if="loading"/>
  <app-page v-else title="Корзина">
    <h3 class="text-center" v-if="isEmpty">В корзине пока ничего нет</h3>
    <div v-else>
      <cart-table :products="cartProducts" ></cart-table>
      <hr>
      <p class="text-right"><strong>Всего: {{ currency(total) }}</strong></p>
      <p class="text-right">
        <app-button type="primary" :disabled="!auth" @action="createOrder">Оплатить</app-button>
      </p>
      <auth-form isCart @signUp="modal = true" v-if="!auth"/>
    </div>
  </app-page>
  <teleport to="body">
    <app-modal v-if="modal" title="Регистрация" @close="modal = false">
      <AuthSignUp @registered="modal = false"/>
    </app-modal>
  </teleport>
</template>

<script>
import {onMounted, ref, computed} from 'vue'
import {useStore} from 'vuex'
import {currency} from '@/utils/currency'
import {useLoadData} from '@/use/load-data'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import CartTable from '@/components/cart/CartTable'
import AppButton from '@/components/ui/AppButton'
import AuthForm from '@/components/auth/AuthForm'
import AppModal from '@/components/ui/modal/AppModal'
import AuthSignUp from '@/components/auth/AuthSignUp'
import axios from '@/axios/firebase';


export default {
  setup() {

    const store = useStore()
    const loading = ref(true)
    const modal = ref(false)
    const cart = computed(() => store.getters['cart/cart'])

    onMounted(async () => {
      await useLoadData()
      loading.value = false
    })

    const cartProducts = computed(() => store.getters['product/products']
      .filter(product => Object.keys(cart.value).includes(product.id)))

    const createOrder = async () => {
      const order = store.getters['cart/cart']
      await axios.post('/orders.json', order)
      await store.dispatch('setMessage', {
        message: 'Заказ успешно создан',
        type: 'primary'
      })
      store.commit('cart/clearCart')
    }

    return{
      loading,
      cartProducts,
      currency,
      modal,
      isEmpty: computed(() => Object.keys(cart.value).length === 0),
      total: computed(() => cartProducts.value.reduce((acc, product) => acc + product.price*cart[product.id], 0)),
      auth: computed(() => store.getters['auth/token']),
      createOrder
    }
  },
  components: {
    AppButton,
    AppLoader,
    AppPage,
    AuthForm,
    CartTable,

    AuthSignUp,
    AppModal
  }
}
</script>

<style scoped>

</style>