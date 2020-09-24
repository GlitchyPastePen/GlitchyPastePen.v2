import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import firebase from 'firebase/app'
import VueSession from 'vue-session'

const options = {
    persist: true
}

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
