<template>
  <form @submit.prevent="onSubmit" v-if="!modal">
    <h3 v-if="isCart">Для оплаты необходимо войти в ситему или зарегистрироваться</h3>
    <h1 v-else>Войти в систему</h1>
    <app-input
      label="Email"
      :error="eError"
      :blur="eBlur"
      v-model="email"
    />
    <app-input
      label="Пароль"
      :error="pError"
      :blur="pBlur"
      v-model="password"
    />
    <app-button
      type="primary"
      :disabled="isSubmitting || isTooManyAttempts"
    >
      Войти
    </app-button>
    <app-button
      v-if="isCart"
      class="btn" type="submit"
      @click.prevent="$emit('signUp')"
      :disabled="isSubmitting"
    >
      Создать аккаунт
    </app-button>
    <div class="text-danger" v-if="isTooManyAttempts">Вы слишком часто лажаете</div>
  </form>
</template>

<script>
import {ref} from 'vue'
import {useLoginForm} from '@/use/login-form'
import AppButton from '@/components/ui/AppButton'
import AppInput from '@/components/ui/AppInput'

export default {
  emits: ['signUp'],
  props: {
    isCart: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const modal = ref(false)

    return {
      modal,
      ...useLoginForm()
    }
  },
  components: {AppInput, AppButton}
}
</script>

<style scoped>

</style>