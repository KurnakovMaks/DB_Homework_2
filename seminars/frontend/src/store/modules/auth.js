// import axios from 'axios'
import jwtDecode from 'jwt-decode'

// initial state
const state = () => ({
  user: {},
  is_auth: false,
})

// getters
const getters = {}

// actions
const actions = {
  setAuth({ commit }, token) {
    this._vm.$axios.defaults.headers.common['Authorization'] = token
    const user = jwtDecode(token)
    commit('setUser', user)
  },

  async signIn({ commit }, credentials) {
    //запрос к sign_up Api
    const resp = await this._vm.$axios.post('/sign_in', credentials)
    const token = resp.data.token
    // добавляем к axios header по умолчанию
    // т.е. чтобы все запросы к бэку отправлялись с токеном
    this._vm.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('token', `Beerer ${token}`)

    const user = jwtDecode(token)
    commit('setUser', user)
  },

  logout({ commit }) {
    delete this._vm.$axios.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    commit('deleteUser')
  },
}

// mutations
const mutations = {
  setUser(state, user) {
    state.user = user
    state.is_auth = true
  },

  deleteUser(state) {
    state.user = {}
    state.is_auth = false
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
