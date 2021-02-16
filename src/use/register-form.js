import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'

export function useRegisterForm(fn) {
  
  const store = useStore()
  
  const {handleSubmit, isSubmitting} = useForm()
  
  const MIN_USERNAME_LENGHT = 3
  
  const {value: userName, errorMessage: userNameError, handleBlur: userNameBlur} = useField(
    'userName',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите имя пользователя')
      .min(MIN_USERNAME_LENGHT, `Имя пользователя не может быть меньше ${MIN_USERNAME_LENGHT} символов`)
  )
  
  const {value: userEmail, errorMessage: userEmailError, handleBlur: userEmailBlur} = useField(
    'userEmail',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите email')
      .email('Необходимо ввести корректный email')
  )
  
  const MIN_PASSWORD_LENGHT = 6
  
  const {value: userPassword, errorMessage: userPasswordError, handleBlur: userPasswordBlur} = useField(
    'userPassword',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите password')
      .min(MIN_PASSWORD_LENGHT, `Пароль не может быть меньше ${MIN_PASSWORD_LENGHT} символов`)
  )
  
  const onRegister = handleSubmit(fn)
  
  
  return {
    userName,
    userNameError,
    userNameBlur,
    userEmail,
    userEmailError,
    userEmailBlur,
    userPassword,
    userPasswordError,
    userPasswordBlur,
    onRegister,
    isSubmitting
  }
}