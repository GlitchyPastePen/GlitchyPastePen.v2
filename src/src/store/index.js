import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      loggedIn: false,
      user: null,
      accessToken: null
  },
  mutations: {
      logIn(state, payload) {
        state.loggedIn = payload
      }
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn
    }
  }
})
