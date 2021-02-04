<template>
  <app-loader v-if="loading"/>
  <app-page v-else title="Корзина">
    <h3 class="text-center" v-if="isEmpty">В корзине пока ничего нет</h3>
    <table class="table" v-else>
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="proruct in cartProducts" :key="proruct.id">
        <td>
          {{proruct.title}}
          <br />
          <img :src="proruct.img" style="max-height: 80px;">
        </td>
        <td>
          <button class="btn primary" @click="cart[proruct.id]++">+</button>
          {{ cart[proruct.id] }} шт.
          <button class="btn danger" @click="remove(proruct.id)">-</button>
        </td>
        <td>{{ currency(proruct.price) }}</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{ currency(total) }}</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </app-page>
</template>

<script>
import {onMounted, ref, computed, watch, reactive} from 'vue'
import {useStore} from 'vuex';
import {currency} from '@/utils/currency'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'

const CART_MODEL = reactive({
  '2': 3,
  '5': 1,
  '7': 8
})

export default {
  setup() {

    const store = useStore()
    const loading = ref(true)

    onMounted(async () => {
      await store.dispatch('product/get')
      loading.value = false
    })

    const cartProducts = computed(() => store.getters['product/products']
      .filter(product => Object.keys(CART_MODEL).includes(product.id)))

    watch(CART_MODEL, value => {
      console.log(value)
      Object.keys(value).filter(id => value[id] === 0).forEach(id => {
        delete CART_MODEL[id]
        store.dispatch('setMessage', {
          type: 'primary',
          value: `Продукт удален из корзины`
        })
      })

    })

    return{
      loading,
      cartProducts,
      cart: CART_MODEL,
      isEmpty: computed(() => Object.keys(CART_MODEL).length === 0),
      total: computed(() => cartProducts.value.reduce((acc, p) => acc + p.price*CART_MODEL[p.id], 0)),
      currency,
      add(id) {
        CART_MODEL[id]++
      },
      remove(id) {
        CART_MODEL[id]--
      }
    }
  },
  components: {
    AppLoader,
    AppPage
  }
}
</script>

<style scoped>

</style>