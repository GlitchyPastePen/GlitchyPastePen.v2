<template>
    <footer>
      <div id="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000b76"
            fill-opacity="1"
            d="M0,32L20,37.3C40,43,80,53,120,53.3C160,53,200,43,240,48C280,53,320,75,360,80C400,85,440,75,480,58.7C520,43,560,21,600,37.3C640,53,680,107,720,138.7C760,171,800,181,840,170.7C880,160,920,128,960,133.3C1000,139,1040,181,1080,202.7C1120,224,1160,224,1200,240C1240,256,1280,288,1320,288C1360,288,1400,256,1420,240L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
          ></path>
        </svg>
      </div>
      <center>
        <small>
          &copy; 2020 <a href="https://github.com/khalby786/GlitchyPastePen">GitHub</a>
        </small>
        <br /><br />
        <!-- <a href="/status"><button>
          Site Health Graphs
        </button></a> -->
      
        <a href="https://glitchypastepen.statuspage.io">
          <button class="small-button block">
            <span id="color-indicator" :class="status"></span>{{description}}
          </button>
        </a>&nbsp;
        <a href="https://forum.glitchypastepen.me">
           <button class="small-button block">
              Forum
          </button>
        </a>
      </center>
    </footer>
</template>

<script>

    export default {
        name: 'Footer',
        data: function() {
          return {
            description: "System Status",
            status: "none",
          }
        },
        mounted: function() {
          fetch("https://ns46nm0bl44x.statuspage.io/api/v2/status.json")
            .then(res => res.json())
            .then(data => {
              console.log(data);
              this.description = data.status.description;
              this.status = data.status.indicator;
            })
        }
    }

</script>

<style scoped>

    footer {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 15%;
      color: white;
      text-align: center;
      margin-bottom: 0px;
      padding-top: 20px;
      position: relative;
      font-family: "IBM Plex Mono", monospace;
    }

    #wave {
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
      z-index: -1;
    }

    button {
      margin-bottom: 25px;
      margin-right: 0px;
      margin-left: 0px;
    }

    .small-button {
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 14px;
      display: inline-block;
    }

    .critical {
      background-color: #e74c3c;
    }

    .major {
      background-color:#e67e22;
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
      display:inline-block;
      width:10px;
      height:10px;
      margin-right:5px;
    }

    a {
      color: inherit;
    }

</style>