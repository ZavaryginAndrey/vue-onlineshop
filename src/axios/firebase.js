import axios from 'axios'

const fbAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_DB_URL
})

export default fbAxios