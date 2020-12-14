<template>
  <footer>
    <h2><router-link to="/">GlitchyPastePen</router-link></h2>
    <p class="power">© 2020 <a href="https://github.com/khalby786/">Khaleel Gibran</a></p>
    <br />
    <span class="button-wrap">
      <a href="https://status.glitchypastepen.me">
        <button class="small-button block">
          <span id="color-indicator" :class="status"></span>{{ description }}
        </button> </a
      >&nbsp;
      <a href="https://forum.glitchypastepen.me">
        <button class="small-button block">Forum</button>
      </a>
    </span>
    <p class="power">Powered by <a href="https://discordlabs.org/">Discord Labs</a></p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: function () {
    return {
      description: "System Status",
      status: "none",
    };
  },
  mounted: function () {
    fetch("https://ns46nm0bl44x.statuspage.io/api/v2/status.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.description = data.status.description;
        this.status = data.status.indicator;
      });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");

footer {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 15%;
  color: white;
  margin-bottom: 0px;
  padding-top: 20px;
  position: relative;
  font-family: "IBM Plex Mono", monospace;
  border-top: 10px solid #8a3ffc;
  overflow: auto;
}

h2 {
  margin: 0px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Poppins", sans-serif;
  font-size: 2em;
  color: grey;
  transition: 200ms;
  display: inline-block;
  cursor: pointer;
}

h2:hover {
  color: white;
  transition: 200ms;
}

.button-wrap {
  margin-left: 20px;
}

button {
  margin-bottom: 25px;
  margin-right: 0px;
  margin-left: 0px;
}

.power {
  text-align: right;  
  float: right;
  margin-right: 20px;
  font-family: "Fira Code", "Fira Mono", "Poppins", sans-serif;
  margin-bottom: 0px;
  font-weight: bold;
}

.small-button {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
  display: inline-block !important;
}

.critical {
  background-color: #e74c3c;
}

.major {
  background-color: #e67e22;
}

.minor {
  background-color: #f1c40f;
}

.none {
  background-color: #2ecc71;
}

#color-indicator {
  -moz-border-radius: 30px; /* or 50% */
  border-radius: 30px;
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

a {
  color: inherit;
  text-decoration-color: #8a3ffc;
}
</style>