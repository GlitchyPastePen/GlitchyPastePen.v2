<template>
    <span>
        <div v-if="loaded === false">
            <center>
                Your project is loading...
            </center>
        </div>
        <span v-else>
            <div id="editor-header" style="border-bottom: 0px solid black !important;background-color: #0F0F0F">
            <!--       <button class="deploy" onclick="beautify()" title="Beautify code!">
                    Beautify
                </button> -->
                <button class="deploy" onclick="deploy();" title="Save code!">
                    Save & deploy
                </button>
                <button class="deploy" onclick="simplecopy(editor.getValue())">
                    Copy code 
                </button>
                <button class="deploy">
                    <a :href="'https://gppp.now.sh/' + project.name" id="preview-link" target="_blank">Preview</a>
                </button>
                <input type="text" id="project-name" oninput="changename()" :value="project.name" />&nbsp;&nbsp;&nbsp;<div class="pulseAnim" ></div>
                <p class="empty">
                    by <a :href="'https://github.com/' + project.owner" class="owner">{{project.owner}}</a>
                </p>
            </div>
            <aside id="filetree">
                <span id="files-label"><i>PROJECT FILES</i></span>
                <div id="files">
                    <button class="file" @click="setHtml()">
                    index<span class="html">.html</span>
                    </button>
                    <button class="file" @click="setCss()">
                    style<span class="css">.css</span>
                    </button>
                    <button class="file" @click="setJs()">
                    script<span class="js">.js</span>
                    </button>
                </div>
                <div id="bottom">
                    <a href="https://glitchypastepen.statuspage.io">System Status</a>
                </div>
            </aside>
            <editor ref='gpp' v-model="content" @init="editorInit" :lang="lang" theme="vibrant_ink" width="calc(100% - 300px)" height="calc(100vh - 117px)"></editor>
            <footer id="editor-footer">
                <span class="left code" onclick="if (document.getElementById('devtool').style.display === 'none') { document.getElementById('devtool').style.display = 'block' } else { document.getElementById('devtool').style.display = 'none' };">
                    DEVTOOLS
                </span>
                <span class="left code" onclick="editor.execCommand('showSettingsMenu')" style="vertical-align:middle;">
                    SETTINGS
                </span>
                <span class="right code" id="pos"> </span>
                <router-link to="/me">
                    <span class="right code">
                        MY PROJECTS
                    </span>
                </router-link>
                <a onclick="contributor()">
                    <span class="right code" style="cursor:pointer;">
                        ADD CONTRIBUTOR
                    </span>
                </a>
                <a onclick="TogetherJS(this); return false;">
                    <span class="right code" style="cursor:pointer;">
                    INVITE CONTRIBUTOR
                    </span>
                </a>
            </footer>
        </span>
    </span>
</template>

<script>

    const axios = require('axios')

    import { EditSession } from 'brace';

    export default {
        name: 'AceEditor',
        data: function() {
            return {
                editor: null,
                content: null,
                lang: 'html',
                htmlSession: new EditSession("<html></html>"),
                cssSession: new EditSession("body { color: red; }"),
                jsSession: new EditSession("console.log('//hi')"),
                htmlCode: null,
                cssCode: null,
                jsCode: null,
                loaded: false,
                project: null
            }
        },
        components: {
            editor: require('vue2-ace-editor')
        },
        methods: {
            editorInit: function (editor) {
                require('brace/ext/language_tools') 
                require('brace/mode/html')                
                require('brace/mode/javascript')
                require('brace/mode/css')   
                require('brace/theme/vibrant_ink')
                require('brace/snippets/javascript')

                let project_name = this.$route.params.project;

                // var html = "<html></html>";
                // var css = "body { color: red; }";
                // var js = "console.log('//hi')";

                // (async() => {
                //     let req = await fetch(`https://gppapi.now.sh/api/code?project=${project_name}`);
                //     let res = await req.json();

                //     html = res.html;
                //     css = res.css;
                //     js = res.js;

                // })()

                editor.setOptions({
                    fontSize: "16px",
                    fontFamily: "Fira Mono",
                    enableSnippets: true,
                    enableLiveAutocompletion: true, 
                    autoScrollEditorIntoView: true
                });

                editor.setSession(this.htmlSession);
                console.log("i'm done")
                this.loaded = true;
            },
            setHtml() {
                require('brace/mode/html');
                this.lang = "html";
                this.$refs.gpp.editor.setSession(this.htmlSession);
            },
            setCss() {
                require('brace/mode/css');
                this.lang = "css"
                this.$refs.gpp.editor.setSession(this.cssSession);
            },
            setJs() {
                require('brace/mode/javascript');
                this.lang = "javascript"
                this.$refs.gpp.editor.setSession(this.jsSession);
            },
        },
        created: function() {
            let project_name = this.$route.params.project;
            console.log(project_name)
            axios.get(`https://gppapi.now.sh/api/code?project=${project_name}`)
                .then(response => {
                    console.log(response)
                    this.htmlCode = response.data.html;
                    this.cssCode = response.data.css;
                    this.jsCode = response.data.js;
                    console.log(response.data.html);
                    this.htmlSession.setValue(response.data.html);
                    this.cssSession.setValue(response.data.css);
                    this.jsSession.setValue(response.data.js);
                    console.log(this.htmlSession);
                    this.loaded = true;
                })

            axios.get(`https://gppapi.now.sh/api/project?project=${project_name}`)
                .then(response => {
                    this.project = response.data;
                })
            },
    }

</script>

<style>

    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap');

    header {
        display: none !important;
    }

    .ace_editor  {
        top: 20px;
        left: 300px;
        border-top: 1px solid white;
        bottom: 26px;
    }

    aside {
        position: absolute;
        float: left;
        display: inline-block;
        width: 299px;
        top: 90px;
        bottom: 26px;
        border-top: 1px solid white;
        background-color: var(--back);
        border-right: 1px solid white;
    }

    #files {
        padding-top: 30px;
        padding-left: 20px;
    }

    #filetree {
        padding-top: 30px;
    }

    .file {
        width: 100%;
        padding: 3px 0px !important;
        border-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        text-align: left;
        background-color: transparent;
        color: white;
        border: none !important;
        margin: 0px;
        font-family: "Roboto Mono", "IBM Plex Mono", monospace;
        transition: 150ms !important;
    }

    .html {
        color: pink;
    }

    .js {
        color: red;
    }

    .css {
        color: orange;
    }

    .file:hover {
        background-color: rgba(201, 76, 76, 0.3) !important;
        color: white !important;
        transition: 150ms !important;
    }

    #files-label {
        color: white;
        margin-left: 20px;
    }

    #bottom {
        position: absolute;
        color: white;
        bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    #bottom a {
        text-decoration: underline;
        color: blue;
    }

    #editor-footer {
        background-color: var(--background);
        width: 100%;
        font-family: "Inter", sans-serif;
        z-index: 10;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        color: white;
        height: 26px;
        padding-top: 0px !important;
        position: fixed;
        border-top: 1px solid white;
        margin-top: 400px;
    }

    #editor-header {
        margin-left: 0px;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        left: 0px;
        height: 30px;
    }

    .deploy {
        background-color: rgba(0, 0, 0, 0);
        display: inline-block;
        float: right;
        cursor: pointer;
        border: 1px solid white;
        margin-right: 20px;
        font-size: 16px;
        background-color: black;
        color: white;
        font-family: "Inter", sans-serif;
        transition: 300ms !important;
    }

    #project-name {
        margin-left: 10px;
        margin-top: 0px;
        background-color: yellow;
        border: none;
        color: black;
        font-family: "IBM Plex Mono", "Inter", "Helvetica", "Arial", sans-serif;
        text-transform: uppercase;
        height: 35px;
        font-size: 20px;
        resize: none;
        overflow-y: hidden;
        outline: none;
        display: inline-block;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
        width: 400px;
    }

    .owner {
        margin-top: 0px;
        color: white;
    }

    #blob {
        display: none;
    }

    #editor-footer p {
        margin: 0px !important;
        margin-top: 0px;
    }

    .right {
        float: right;
        margin-right: 10px;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 5px;
        padding-right: 5px;
        color: white;
    }

    .right:hover {
        --hover: #8547ff;
        background-color: var(--hover);
    }

    .left {
        float: left;
        margin-left: 10px;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
    }

    .left:hover {
        --hover: #8547ff;
        background-color: var(--hover);
    }

    .code {
        font-family: "Fira Mono", "IBM Plex Mono", monospace;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }

    .empty {
        margin-left: 10px;
        margin-top: 0px;
    }
    

</style>