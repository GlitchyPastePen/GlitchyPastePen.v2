<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <header>
      <a href="/">
        <img
          src="https://cdn.glitch.com/a1686874-cbbf-4ca9-b412-cd53a73b9ceb%2Fglitchypastepen.png?v=1587918769653"
          height="100px"
      /></a>
      <span style="float:right;margin-right:20px;">
        <button @click="logout()" v-if="loggedIn">
            Logout
        </button>
        <button @click="login()" v-if="notLoggedIn">
            Login
          </button>
        <a
          href="https://github.com/login/oauth/authorize?client_id=b1619bb3723d36119cfa"
          ><button v-if="notLoggedIn">
            Signup
          </button></a
        >
      </span>
    </header>
    <div id="blob">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#8A3FFC"
          d="M45,-38.4C56.9,-33.2,64,-16.6,62.2,-1.8C60.3,12.9,49.5,25.8,37.6,36.6C25.8,47.4,12.9,56,1.8,54.2C-9.3,52.4,-18.5,40.1,-32.7,29.3C-46.8,18.5,-65.9,9.3,-70.7,-4.8C-75.4,-18.8,-65.9,-37.6,-51.7,-42.8C-37.6,-48,-18.8,-39.7,-1.1,-38.6C16.6,-37.5,33.2,-43.6,45,-38.4Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
    <router-view/>
  </div>
</template>

<script>

    import * as firebase from "firebase/app";
    import "firebase/auth";

    import Vue from "vue";

    export default {
        data: function() {
            return {
                loggedIn: this.$store.getters.isLoggedIn,
                notLoggedIn: !this.$store.getters.isLoggedIn
            }
        },
        methods: {
            login: function() {
                console.log(firebase);
                console.log(this.$store);
                var provider = new firebase.auth.GithubAuthProvider();
                var that = this;
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    console.log(token);
                    console.log(user);

                    // ...
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;

                    return;
                }).then(() => {
                    this.$store.commit('logIn', true);
                    this.loggedIn = true;
                    this.notLoggedIn = false;
                    console.log(this.$store.getters.isLoggedIn);
                });
                console.log(this.$store.getters.isLoggedIn)
            },
            logout: function() {
                (async() => {
                    try {
                        await firebase.auth().signOut();
                        this.$store.commit('logIn', false);
                        this.loggedIn = false;
                        this.notLoggedIn = true;
                    } catch (e){
                        console.error(e);
                    } 
                })
            }
        }
    }

</script>

<style>
    @import url("https://rsms.me/inter/inter.css");
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500&family=IBM+Plex+Mono&display=swap");

    body {
    --fore: black;
    --back: #0F0F0F;
    background-color: var(--back);
    color: var(--fore);
    font-family: "Inter", "Helvetica", "Arial", sans-serif;
    margin-top: 30px;
    margin: 0px;
    }

    header {
    margin-left: 0px;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #DCDCDC;
    left: 0px;
    }


    button {
    background-color: rgba(0, 0, 0, 0);
    display: inline-block;
    cursor: pointer;
    border: 1px solid white;
    margin-right: 20px;
    font-size: 16px;
    background-color: black;
    color: white;
    font-family: "Inter", sans-serif;
    transition: 300ms !important;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-radius: 5px;
    }

    button:hover {
    background-color: white !important;
    color: black !important;
    transition: 300ms !important;
    }

    #blob {
    position: absolute;
    z-index: -1;
    top: -200px;
    left: -200px;
    width: 50vw;
    }
</style>
