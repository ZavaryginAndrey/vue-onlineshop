import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useCategoryForm(fn) {
  
  
  const {handleSubmit, isSubmitting} = useForm()
  
  const {value: title, errorMessage: titleError, handleBlur: titleBlur} = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите название категории')
  )
  
  
  const {value: type, errorMessage: typeError, handleBlur: typeBlur} = useField(
    'type',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите тип категории')
      .matches('[\\w+\\s+]+', 'Название категории должно содержать английские буквы')
  )
  
  const onSubmit = handleSubmit(fn)
  
  return {
    title,
    titleError,
    titleBlur,
    type,
    typeError,
    typeBlur,
    onSubmit,
    isSubmitting
  }
}