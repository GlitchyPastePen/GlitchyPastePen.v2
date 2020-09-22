<template>
    <center>
        <img :src="user.photoURL" style="border-radius:50%;width:300px;" />
    </center>
</template>

<script>

    export default {
        name: 'User',
        data: function() {
            return {
                user: this._user
            }
        },
        computed: {
            _user() {
                return this.$store.getters.user;
            }
        },
        watch: {
            _user(oldValue, newValue) {
                console.log(oldValue);
                console.log(newValue);
            }
        },
        created: function() {
            if (this.$store.getters.isLoggedIn === false) {
                this.$router.push('/');
            }
        }
    }

</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500&family=IBM+Plex+Mono&display=swap');
    
    body {
      --fore: black;
      --back: white;
      background-color: var(--back);
      color: black;
      font-family: "Inter", "Helvetica", "Arial", sans-serif;
      margin: 0px;
    }
    
    h1 {
      margin-left: 25px;
      margin-top: 30px;
    }
    header {
      margin-left: 0px;
      padding-left: 20px;
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #DCDCDC;
      left: 0px;
    }
    
    #main {
      margin-left: 15%;
      margin-right: 15%;
    }
    
    .project {
      padding-top: 10px;
      padding-left: 20px;
      padding-bottom: 10px;
      font-family: "Fira Mono", "Inter", "Raleway", sans-serif;
      transition: 1s ease;
      background-color: white;
      border: 1px solid grey;
      border-radius: 5px;
      margin-top: 20px;
      display: block;
      width: 100%;
      left: 0px;
      font-size: 25px;
      overflow: hidden;
      box-shadow:
        0 0px 2.2px rgba(0, 0, 0, 0.02),
        0 0px 5.3px rgba(0, 0, 0, 0.028),
        0 0px 10px rgba(0, 0, 0, 0.035),
        0 0px 17.9px rgba(0, 0, 0, 0.042),
        0 0px 33.4px rgba(0, 0, 0, 0.05),
        0 0px 80px rgba(0, 0, 0, 0.07)
      ;
      transition: 150ms;
    }
    
    .project:hover {
      box-shadow: none;
      transition: 150ms;
    }
    
    img {
      cursor: pointer;
    }
    
/*     #new {
      float: right;
      margin-right: 20px;
      margin-top: 70px;
      background-color: #1f2430;
      border: none;
      color: yellow;
      padding-top: 10px;
      padding-left: 20px;
      padding-bottom: 10px;
      padding-right: 20px;
      cursor: pointer;
    } */
    
    a {
      text-decoration: none;
      color: white;
    }
    
    .new {
      background-color: white;
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
      color: black !important;
      border: 1px solid black;
      border-radius: 5px;
      transition: 1s ease;
      cursor: pointer;
      font-family: "IBM Plex Mono", monospace;
      float: right;
      margin-top: 0px;
      margin-right: 15px;
      font-size: 15px;
    }
    
    .new a {
      color: black !important;
    }
    .new:hover {
      background-color: yellow;
      color: black;
      transition: 200ms linear;
    }
    
    .pace {
      -webkit-pointer-events: none;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
    .pace-inactive {
      display: none;
    }
    .pace .pace-progress {
      background: #fffe00;
      position: fixed;
      z-index: 2000;
      top: 0;
      right: 100%;
      width: 100%;
      height: 2px;
    }

</style>