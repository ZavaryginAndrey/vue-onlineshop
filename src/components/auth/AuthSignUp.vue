<template>
  <form @submit.prevent="onRegister">
    <app-input
      label="Имя пользователя"
      :blur="userNameBlur"
      :error="userNameError"
      v-model="userName"
    />
    <app-input
      label="Email"
      :blur="userEmailBlur"
      :error="userEmailError"
      v-model="userEmail"
    />
    <app-input
      label="Пароль"
      :blur="userPasswordBlur"
      :error="userPasswordError"
      v-model="userPassword"
    />

    <app-button type="primary">Зарегистрироваться</app-button>
  </form>
</template>

<script>
import {useStore} from 'vuex'
import {useRegisterForm} from '@/use/register-form'
import AppModal from '@/components/ui/modal/AppModal'
import AppInput from '@/components/ui/AppInput'
import AppButton from '@/components/ui/AppButton'

export default {
  emits: ['registered'],
  setup(_, {emit}) {
    const store = useStore()

    const register = async values => {
      await store.dispatch('auth/register', values)
      emit('registered')
    }

    return {
      ...useRegisterForm(register)
    }
  },
  components: {AppButton, AppInput, AppModal}
}
</script>

<style scoped>

</style>