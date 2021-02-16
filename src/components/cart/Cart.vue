<template>
  <app-loader v-if="loading"/>
  <app-page v-else title="Корзина">
    <h3 class="text-center" v-if="isEmpty">В корзине пока ничего нет</h3>
    <div v-else>
      <cart-table :products="cartProducts" ></cart-table>
      <hr>
      <p class="text-right"><strong>Всего: {{ currency(total) }}</strong></p>
      <p class="text-right">
        <app-button type="primary" :disabled="!auth">Оплатить</app-button>
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


export default {
  setup() {

    const store = useStore()
    const loading = ref(true)
    const modal = ref(false)
    const cart = store.getters['cart/cart']

    onMounted(async () => {
      await useLoadData()
      loading.value = false
    })

    const cartProducts = computed(() => store.getters['product/products']
      .filter(product => Object.keys(cart).includes(product.id)))

    return{
      loading,
      cartProducts,
      currency,
      modal,
      isEmpty: computed(() => Object.keys(cart).length === 0),
      total: computed(() => cartProducts.value.reduce((acc, product) => acc + product.price*cart[product.id], 0)),
      auth: computed(() => store.getters['auth/token'])
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