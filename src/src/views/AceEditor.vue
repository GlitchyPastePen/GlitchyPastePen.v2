<template>
    <span>
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
        <editor ref='gpp' v-model="content" @init="editorInit" :lang="lang" theme="vibrant_ink" width="calc(100% - 300px)" height="calc(100vh - 91px)"></editor>
    </span>
</template>

<script>
    import { EditSession } from 'brace';

    export default {
        name: 'AceEditor',
        data: function() {
            return {
                editor: null,
                content: null,
                lang: 'html',
                htmlSession: null,
                cssSession: null,
                jsSession: null
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

                var html = "<html></html>";
                var css = "body { color: red; }";
                var js = "console.log('//hi')";

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

                var that = this;

                fetch(`https://gppapi.now.sh/api/code?project=${project_name}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(that);
                        that.htmlSession = new EditSession(html);
                        that.jsSession = new EditSession(js);
                        that.cssSession = new EditSession(css); 

                        that.lang = "html";
                        editor.setSession(that.htmlSession);
                    })

            },
            setHtml() {
                this.lang = "html"
                this.$refs.gpp.editor.setSession(this.htmlSession);
            },
            setCss() {
                this.lang = "css"
                this.$refs.gpp.editor.setSession(this.cssSession);
            },
            setJs() {
                this.lang = "javascript"
                this.$refs.gpp.editor.setSession(this.jsSession);
            }

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
        top: 90px;
        left: 300px;
        border-top: 1px solid white;
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


</style>