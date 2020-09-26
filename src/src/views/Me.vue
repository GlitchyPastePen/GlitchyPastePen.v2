<template>
    <div class="root">
        <center>
            <br><br>
            <img :src="user.avatar_url" style="border-radius:50%;width:300px;" />
            <h2>{{user.login}}</h2>
            <span class="email">{{user.email}}</span>
        </center>
        <br><br>
        <div id="main">
            <h3 class="sub-heading">YOUR PROJECTS</h3>
            <div class="skeleton" v-if="projectsLoaded === false">&nbsp;<br>&nbsp;</div>
            <div class = "project" v-for="project in projects" v-if="projectsLoaded === true">
                <span class="project-name">{{project.key}} &nbsp;&nbsp;</span>
                <span class="options">
                    <i class="fas fa-trash-alt" style="float:right;margin-right:20px;"></i>
                    <i class="fas fa-external-link-alt" style="float:right;margin-right:15px;"></i>
                    <i class="fas fa-pencil-alt" style="float:right;margin-right:15px;"></i>
                </span>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>

    import Footer from "@/components/Footer.vue";

    export default {
        name: 'User',
        data: function() {
            return {
                user: this.$session.get("github"),
                projects: null,
                projectsLoaded: false,
                userLoaded: false,
            }
        },
        components: {
            Footer
        },
        created: function() {
            if (!this.$session.exists()) {
                this.$router.push('/');
            } else {
                console.log("exists!!!")
                console.log(this.$session.get("user"))
            }
        },
        mounted: function() {

            const githubUser = this.$session.get("github").login;

            fetch(`https://gppapi.now.sh/api/projects?user=${githubUser}`)
                .then(res => res.json())
                .then(data => {
                    this.projects = data;
                    this.projectsLoaded = true;
                })

        }
    }

</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500&family=IBM+Plex+Mono&display=swap');
    
    body {
      --fore: white;
      --back: #0F0F0F;
      background-color: var(--back);
      color: black;
      font-family: "Inter", "Helvetica", "Arial", sans-serif;
      margin: 0px;
    }
    
    h1 {
      margin-left: 25px;
      margin-top: 30px;
    }

    h2 {
        color: white;
        margin-bottom: 0px;
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
      margin-bottom: 300px;
    }
    
    .project {
      padding-top: 10px;
      padding-left: 20px;
      padding-bottom: 10px;
      font-family: "Fira Mono", "Inter", "Raleway", sans-serif;
      transition: 1s ease;
      border: 3px solid yellow;
      border-radius: 5px;
      margin-top: 20px;
      display: block;
      width: 100%;
      left: 0px;
      font-size: 25px;
      overflow: hidden;
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

    .sub-heading {
        font-family: "IBM Plex Mono", monospace;
    }

    .project-name {
        display: inline-block;
    }

    .options {
        float: right;
        display: inline-block;
    }

    .skeleton {
        border-radius: 5px;
        background-color: #586069;
        width: 100%;
        padding-top: 10px;
        padding-left: 20px;
        padding-bottom: 10px;
        border: 3px solid #586069;
    }


</style>