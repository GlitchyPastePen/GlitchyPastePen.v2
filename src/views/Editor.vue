<template>
    <div>
        <div v-if="loaded === false" id="loader">
            <center>
                <div class="donutSpinner"></div>
                <br /><br />
                <b>Loading...</b>
                <br /><br />
                <p style="font-family: 'Fira Code', 'IBM Plex Mono', monospace">
                    {{ project_name }}
                </p>
            </center>
            <Footer />
        </div>
        <div class="header" v-if="loaded === true">
            <button class="project-name round fixed block">{{project.name}}</button>
            <button @click="editor = 'html'" class="block lang-option">HTML</button>
            <button @click="editor = 'css'" class="block lang-option">CSS</button>
            <button @click="editor = 'js'" class="block lang-option">JavaScript</button>

            <button class="actions accent block" @click="deploy"><i class="far fa-save"></i> <span v-html="deployingText"></span></button>
            <button class="actions accent block"><a :href="'https://gppp.netlify.app/' + project_name" target="_blank"> <i class="fas fa-external-link-alt"></i> Open preview in a new tab</a></button>
        </div>
        <div class="editor-iframe">
            <MonacoEditor ref="htmlEditor" @editorDidMount="updateDimensions" v-if="editor === 'html' && loaded === true" class="editor" v-model="htmlCode" language="html" theme="vs-dark"/>
            <MonacoEditor ref="cssEditor" v-if="editor === 'css' && loaded === true" class="editor" v-model="cssCode" language="css" theme="vs-dark"/>
            <MonacoEditor ref="jsEditor" v-if="editor === 'js' && loaded === true" class="editor" v-model="jsCode" language="javascript" theme="vs-dark"/>
            <iframe v-if="loaded === true" :src="'https://gppp.netlify.app/' + project_name"></iframe>
            <!-- <iframe :src="'https://xkcd.com'"></iframe> -->
        </div>
    </div>
</template>

<script>
import MonacoEditor from 'vue-monaco';
import Footer from "@/components/Footer.vue";

var axios = require("axios");
var fetch = require("node-fetch");

export default {
    components: {
        MonacoEditor,
        Footer
    },
    data() {
        return {
            htmlCode: '<p>Hello!</p>',
            cssCode: '/* add styles here */',
            jsCode: '// add javascript code here',
            editor: 'html',
            user: this.$session.get("github"),
            active_users: [],
            project_name: null,
            project: null,
            loaded: false,
            deployingText: "Save and deploy"
        }
    },
    methods: {
        updateDimensions() {
            this.$refs.htmlEditor.layout();
            console.log("should resize")
        },
        updateDimensions(editor) {
            window.addEventListener("resize", editor.layout());
            setTimeout(function() {
                editor.layout();
            }, 5000)
            console.log("should resize now")
        },
        deploy: function () {
            (async () => {
                this.deployingText = "<i>Deploying...</i>";
                let data = {
                    project: this.project_name,
                    html: this.htmlCode,
                    css: this.cssCode,
                    js: this.jsCode,
                };

                let req = await fetch(
                "https://api.glitchypastepen.me/api/deploy?project=" +
                    this.project_name,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.$session.get("idToken")}`,
                    },
                    body: JSON.stringify(data),
                }
                );

                let res = await req.json();
                let { status, message } = res;
                console.log(res);

                if (res.error) {
                    Swal.fire({
                        icon: "error",
                        text: message,
                    })
                } else if (status === 401 || status === 403) {
                    Swal.fire({
                        icon: "warning",
                        text: message,
                    })
                } else {
                    Swal.fire({
                        icon: "success",
                        text: message,
                    })
                }

                this.deployingText = "Save and Deploy";
            })();
        }
    },
    mounted: function () {
        let project_name = this.$route.params.project;

        var that = this;

        function getGithubUser() {
            axios
                .get(`https://api.github.com/users/${that.project.owner}`)
                .then((response) => {
                    that.user = response.data;
                })
        }

        axios
            .get(`https://gppapi.now.sh/api/project?project=${project_name}`)
            .then((response) => {
                this.project = response.data;
                getGithubUser();
            });

        this.project_name = project_name;

        axios
            .get(`https://gppapi.now.sh/api/code?project=${project_name}`)
            .then((response) => {
                that.htmlCode = response.data.html;
                that.cssCode = response.data.css;
                that.jsCode = response.data.js;
            });

        setTimeout(function() { 
            that.loaded = true 
        }, 5000);
    }
}
</script>

<style>
#loader {
  height: 100%;
  width: 100%;
  margin-top: 30vh;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

.editor-iframe {
    display: flex;
}

.editor {
    width: 50%;
    height: calc(100vh - 51px);
    display: block;
    position: absolute;
    bottom: 0px;
    flex: 50vw;
}

iframe {
    width: 50%;
    height: calc(100vh - 51px);
    display: block;
    position: absolute;
    bottom: 0px;
    border: none;
    right: 0px;
    background-color: white;
    flex: 50vw;
}

header {
    display: none !important;
}

body {
    overflow: hidden;
}

.header {
    position: absolute;
    width: 100%;
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-left: 5px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.project-name {
    display: inline-block;
    font-size: 12px;
    font-family: "Fira Mono", "Fira Code", "IBM Plex Mono", monospace;
}

.lang-option {
    display: inline-block;
    font-size: 12px;
}

.actions {
    font-size: 12px;
    display: inline-block;
}

.donutSpinner {
  display: inline-block;
  border: 4px solid hsl(222, 100%, 95%);
  border-left-color: hsl(243, 80%, 62%);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

footer {
  position: absolute !important;
}

a {
    color: inherit;
    text-decoration: none !important;
}
</style>