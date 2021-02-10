import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';

export function useProductForm(fn) {
  
  
  const {handleSubmit, isSubmitting} = useForm()
  
  const {value: title, errorMessage: titleError, handleBlur: titleBlur} = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите название')
      .matches('[\\w+\\s+]+', 'Название продукта не должно содержать цифр или других символов')
  )
  
  const {value: img, errorMessage: imgError, handleBlur: imgBlur} = useField(
    'img',
    yup
      .string()
      .trim()
      .required('Пожалуйста укажите URL изображения товара')
  )
  
  const {value: count, errorMessage: countError, handleBlur: countBlur} = useField(
    'count',
    yup
      .number()
      .required('Пожалуйста введите количество товара')
      .min(0, 'Количество товара не может быть отрицательным')
  )
  
  
  const {value: price, errorMessage: priceError, handleBlur: priceBlur} = useField(
    'price',
    yup
      .number()
      .required('Пожалуйста введите цену товара')
      .min(0, 'Цена товара не может быть отрицательной')
  )
  
  const {value: type, errorMessage: typeError, handleBlur: typeBlur} = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите тип категории')
  )
  
  const {value: category, errorMessage: categoryError, handleBlur: categoryBlur} = useField('category',
    yup
      .string()
      .required('Выбери категорию')
  )
  
  const onSubmit = handleSubmit(fn)
  
  return {
    title,
    titleError,
    titleBlur,
    img,
    imgError,
    imgBlur,
    count,
    countError,
    countBlur,
    price,
    priceError,
    priceBlur,
    category,
    categoryError,
    categoryBlur,
    type,
    typeError,
    typeBlur,
    onSubmit,
    isSubmitting
  }
}