<template>
    <editor v-model="content" @init="editorInit" lang="javascript" theme="vibrant_ink" width="100%" height="100vh"></editor>
</template>

<script>

    export default {
        name: 'AceEditor',
        data: function() {
            return {
                editor: null,
                content: null
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

                editor.setOptions({
                    fontSize: "16px",
                    fontFamily: "Fira Mono",
                    enableSnippets: true,
                    enableLiveAutocompletion: true, 
                    autoScrollEditorIntoView: true
                });
            }   

        },
        created: function() {
            // let ace_01 = document.createElement('script');    
            // ace_01.setAttribute('src',"https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js");
            // document.head.appendChild(ace_01);

            // let ace_02 = document.createElement('script');    
            // ace_02.setAttribute('src',"https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ext-beautify.min.js");
            // document.head.appendChild(ace_02);

            // let ace_03 = document.createElement('script');    
            // ace_03.setAttribute('src',"https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ext-language_tools.min.js");
            // document.head.appendChild(ace_03);

            // let ace_04 = document.createElement('script');    
            // ace_04.setAttribute('src',"https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ext-keybinding_menu.min.js");
            // document.head.appendChild(ace_04);

            // this.editor = ace.edit("editor");
            // this.editor.setTheme("ace/theme/monokai");
            // this.editor.session.setMode("ace/mode/javascript");

            // this.editor.setOptions({
            //     fontSize: "14px",
            //     fontFamily: "Fira Mono"
            // });
        },
    }

</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap');

    #editor {
        position: absolute;
        top: 90px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        z-index: 2;
        border-top: 1px solid white;
    }

</style>