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
      },
      resetUser(state) {
        state.user = null
      },
      resetAccessToken(state) {
        state.accessToken = null
      },
      setUser(state, payload) {
        state.user = payload;
      },
      setAccessToken(state, payload) {
        state.accessToken = payload;
      }
  }, 
  getters: {
    isLoggedIn: state => {
      return state.loggedIn
    },
    user: state => {
      return state.user
    },
    accessToken: state => {
      return state.accessToken
    }
  }
})
