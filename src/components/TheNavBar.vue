<template>
  <nav class="navbar">
    <h3>{{admin ? 'Админка' : 'Магазинчик'}}</h3>
    <ul class="navbar-menu" v-if="admin">
      <li>
        <router-link to="/admin/products">Инвентарь</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li>
        <router-link to="/">Выход</router-link>
      </li>
    </ul>
    <ul class="navbar-menu" v-else>
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина {{ cartItemsCount ? `[${cartItemsCount}]` : ''}}</router-link>
      </li>
      <li>
        <router-link to="/" v-if="isAuthenticated">Выход</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue';

export default {
  props: ['admin'],
  setup() {
    const store = useStore()


    return {
      cartItemsCount: computed(() => store.getters['cart/cartItemsCount']),
      isAuthenticated: computed(() => store.getters['auth/token'])
    }
  }
}
</script>

<style scoped>

</style>