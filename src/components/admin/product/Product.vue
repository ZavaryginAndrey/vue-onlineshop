<template>
  <app-loader v-if="loading"/>
  <div class="card" v-else>
    <app-input v-model="product.title" label="Название" />
    <app-input v-model="product.img" label="Изображение" />
    <app-input v-model="product.count" label="Количество" />
    <app-input v-model="product.price" label="Цена" />
    <div class="form-control">
      <label>Категория</label>
      <select v-model="product.category">
        <option v-for="c in categories" :value="c.type">{{c.title}}</option>
      </select>
    </div>
    <app-button type="danger" @action="confirmRemove = true">Удалить</app-button>
    <app-button type="primary" @action="confirmUpdate = true" v-if="hasChanges">Обновить</app-button>
  </div>
  <teleport to="body">
    <app-confirm
      v-if="confirmRemove"
      :message="`Вы уверены что хотите удалить продукт ${product.title}?`"
      @close="confirmRemove = false"
      @confirm="remove"
      @reject="confirmRemove = false"
    />
    <app-confirm
      v-else-if="confirmUpdate"
      :message="`Вы уверены что хотите обновить данные продукта ${product.title}?`"
      @close="confirmUpdate = false"
      @confirm="update"
      @reject="confirmUpdate = false"
    />
  </teleport>
</template>

<script>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'
import {useLoadData} from '@/use/load-data'
import AppInput from '@/components/ui/AppInput'
import AppLoader from '@/components/ui/AppLoader'
import AppButton from '@/components/ui/AppButton'
import AppConfirm from '@/components/ui/modal/AppConfirm'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const loading = ref(true)
    const confirmRemove = ref(false)
    const confirmUpdate = ref(false)
    let initialValue
    // Как быть?
    // reactive не позволяет обновить значение после загрузки данных.
    // из-за чего происходит ошибка, при попытке получить доступ к атрибутам undefined объекта
    const product = ref()

    onMounted(async () => {
      await useLoadData()
      loading.value = false
      initialValue = store.getters['product/products'].find(p => p.id === route.params.id)
      product.value = {...initialValue}
    })

    const hasChanges = computed(() =>
      Object.keys(product.value).reduce((acc, key) => {
        return product.value[key] !== initialValue[key] || acc
      }, false)
    )

    const remove = async () => {
      await store.dispatch('product/remove', route.params.id)
    }

    const update = async () => {
      initialValue = await store.dispatch('product/update', product.value)
      product.value = {...initialValue}
    }

    return {
      confirmRemove,
      confirmUpdate,
      loading,
      product,
      hasChanges,
      remove,
      update,
      categories: computed(() => store.getters['product/categories'])
    }
  },
  components: {
    AppConfirm,
    AppInput,
    AppLoader,
    AppButton
  }
}
</script>

<style scoped>

</style>