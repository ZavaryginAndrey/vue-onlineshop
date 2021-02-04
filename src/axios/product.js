import axios from 'axios'

const productAxios = axios.create({
  baseURL: process.env.VUE_APP_LOCAL_DB_URL
})

export default productAxios