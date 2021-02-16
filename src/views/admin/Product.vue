<template>
  <app-loader v-if="loading"/>
  <app-page
    v-else-if="product.title"
    :title="product.title"
  >
    <img :src="product.img">
    <app-input
      v-model="product.title"
      label="Название" />
    <app-input
      v-model="product.img"
      label="Изображение" />
    <app-input
      v-model.number="product.count"
      type="number"
      label="Количество" />
    <app-input
      v-model.number="product.price"
      type="number"
      label="Цена" />
    <div class="form-control">
      <label>Категория</label>
      <select v-model="product.category">
        <option v-for="c in categories" :value="c.type">{{c.title}}</option>
      </select>
    </div>
    <app-button type="danger" @action="confirmRemove = true">Удалить</app-button>
    <app-button type="primary" @action="confirmUpdate = true" v-if="hasChanges">Обновить</app-button>
  </app-page>
  <h3 class="text-center text-white" v-else>
    Товара не найден.
  </h3>
  <teleport to="body">
    <app-confirm
      v-if="confirmRemove"
      :message="`Вы уверены что хотите удалить продукт ${product.title}?`"
      @confirm="remove"
      @reject="confirmRemove = false"
    />
  </teleport>
  <teleport to="body">
    <app-confirm
      v-if="confirmUpdate"
      :message="`Вы уверены что хотите обновить данные продукта ${product.title}?`"
      @confirm="update"
      @reject="confirmUpdate = false"
    />
  </teleport>
  <teleport to="body">
    <app-confirm
      v-if="leave"
      :message="`У вас есть несохранённые изменения, хотите покинуть страницу?`"
      @confirm="navigate"
      @reject="leave = false"
    />
  </teleport>
</template>

<script>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'
import {useLoadData} from '@/use/load-data'
import {useLeaveGuard} from '@/use/leave-guard'
import AppInput from '@/components/ui/AppInput'
import AppPage from '@/components/ui/AppPage'
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
    const product = ref({})

    onMounted(async () => {
      await useLoadData()
      loading.value = false
      initialValue = store.getters['product/products'].find(p => p.id === route.params.id)
      product.value = {...initialValue}
      console.log('mounted', initialValue)
    })

    const hasChanges = computed(() => Object.keys(product.value).reduce((acc, key) => {
        return product.value[key] !== initialValue[key] || acc
      }, false)
    )

    const remove = async () => {
      confirmRemove.value = false
      // здесь есть бага (может Владилен поможет разобраться)
      // при попытке удалить продукт, поля которого были изменены - срабатывает leaveGuard.
      // leaveGuard срабатывает после удаления, в следствии чего появляется redirect confirm
      // это ломает workflow, т.к отказавшить покинуть страницу - мы останемся на странице удалённого товара.
      // Не придумал ничего лучше, чем отменить изменения продукта, если удаление было подтверждено

      product.value = {...initialValue}
      await store.dispatch('product/remove', route.params.id)
    }

    const update = async () => {
      confirmUpdate.value = false
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
      categories: computed(() => store.getters['product/categories']),
      ...useLeaveGuard(hasChanges)
    }
  },
  components: {
    AppConfirm,
    AppInput,
    AppLoader,
    AppButton,
    AppPage
  }
}
</script>

<style scoped>

</style>