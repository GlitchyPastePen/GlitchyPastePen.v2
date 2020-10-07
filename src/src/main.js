import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import firebase from 'firebase/app'
import VueSession from 'vue-session'

const options = {
    persist: true
}

// This variable will hold the reference to
// document's click handler
let handleOutsideClick
Vue.directive('closable', {
  bind (el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = (e) => {
      e.stopPropagation()
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const { handler, exclude } = binding.value
      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false
      exclude.forEach(refName => {
        // We only run this code if we haven't detected
        // any excluded element yet
        if (!clickedOnExcludedEl) {
          // Get the element using the reference name
          const excludedEl = vnode.context.$refs[refName]
          // See if this excluded element
          // is the same element the user just clicked on
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })
      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]()
      }
    }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },
  unbind () {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueSession, options)

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDinWdAZJgt0Vk-mOElQW8LVJLaG55-sr8",
    authDomain: "glitchypastepen.firebaseapp.com",
    databaseURL: "https://glitchypastepen.firebaseio.com",
    projectId: "glitchypastepen",
    storageBucket: "glitchypastepen.appspot.com",
    messagingSenderId: "468097389782",
    appId: "1:468097389782:web:7ffcffe7048dd68b68e577"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
