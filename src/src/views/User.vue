<template>
    <div>
        <br><br>
        <center>
            <img :src="user.avatar_url" style="border-radius:50%;width:300px;" />
        </center>

        <div class = "project" v-for="project in projects">
          {{project.key}} &nbsp;&nbsp;
          <br />
          <img style="float:right;margin-right:20px;" onclick="remove('<%= project.key %>')" src="https://cdn.glitch.com/622554c6-3118-4838-8819-e003b9525f5d%2Fdelete.svg?v=1589450120507" height="30px">
          <a href="/p/<%= project.key %>"><img style="float:right;margin-right:10px;" src="https://cdn.glitch.com/622554c6-3118-4838-8819-e003b9525f5d%2Fexternal.svg?v=1589450399039" height="30px;"></a>
          <a href="/editor/<%= project.key %>"><img style="float:right;margin-right:15px;" src="https://cdn.glitch.com/622554c6-3118-4838-8819-e003b9525f5d%2Fedit.svg?v=1589450679556" height="30px"></a>
          <br /><br />
        </div>
    </div>
</template>

<script>

    // var Endb = require('endb');
    import Endb from "endb";
    import "@endb/mongo";
    var user = new Endb({
        uri: process.env.MONGO_URI + "user?retryWrites=true&w=majority",
        adapter: "mongodb"
    });

    export default {
        name: 'User',
        data: function() {
            return {
                user: null,
                projects: null
            }
        },
        // computed: {
        //     _user() {
        //         // let user = this.$axios.get(`https://api.github.com/users/${this.$route.params.user}`);

        //         console.log(user);
        //         return user.info;
        //     }
        // }
        mounted: function() {

            // (async() => {
            //     try {
            //         await user.
            //     } catch (e) {

            //     }
            // })()

            fetch(`https://api.github.com/users/${this.$route.params.user}`)
                .then(res => res.json())
                .then(data => this.user = data)

            var project = new Endb({
                uri: process.env.MONGO_URI + "projects?retryWrites=true&w=majority",
                adapter: "mongodb"
            });

            (async() => {
                var projects = await project.all();

                projects = projects.filter(
                    project => project.value.owner === this.$route.params.user
                );

                this.projects = projects;
            })
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