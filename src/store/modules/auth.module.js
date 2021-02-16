import axios from 'axios'
const TOKEN_KEY = 'jwt-token'
const USER_ID_KEY = 'userLocalId'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY) || null,
      role: null
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setRole(state, payload) {
      localStorage.setItem(USER_ID_KEY, payload.id)
      state.role = payload.role
    },
    logout(state) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_ID_KEY)
      state.token = null
      state.role = null
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
      try {
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        
        const role = await dispatch('getUserRole')
        commit('setRole', {
          id: data.localId,
          role: role
        })
      } catch (e) {
        console.log(e.response.data.error.message)
        throw new Error()
      }
    },
    async register({ commit, dispatch }, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
      try {
        const {userEmail: email, userPassword: password} = payload
        const {data} = await axios.post(url, {email, password, returnSecureToken: true})
        await axios.put(process.env.VUE_APP_FB_DB_URL+`users/${data.localId}.json`, {username: payload.userName, role: 'user'})
        commit('setToken', data.idToken)
        
        commit('setRole', {
          id: data.localId,
          role: 'user'
        })
      } catch (e) {
        console.log(e.response.data.error.message)
        throw new Error()
      }
    },
    async getUserRole(_, payload) {
      const {data} = await axios.get(process.env.VUE_APP_FB_DB_URL+`users/${payload}.json`)
      return data.role
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    role(state) {
      return state.role
    },
    userLocalId(state) {
      return localStorage.getItem(USER_ID_KEY) || undefined
    }
  }
}