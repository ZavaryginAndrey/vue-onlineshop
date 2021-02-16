import {useStore} from 'vuex'
import axios from '../axios/firebase'

export async function useOrder() {
  const store = useStore()
  
  const createOrder = async () => {
  
  }
  
  return {
    createOrder
  }
}