<template>
    <div id="node">
        <runkit ref="runkit" :source="code" :node-version="'12.0.0'" /> 
        <MonacoEditor ref="nodeEditor" class="editor" v-model="code" language="javascript" theme="vs-dark" @change="updateRunkit"/>
    </div>
</template>

<script>
import runkit from 'vue-runkit';
import MonacoEditor from 'vue-monaco';

export default {
    name: "Node",
    data() {
        return {
            code: "console.log('hello!');"
        }
    },
    components: {
        runkit,
        MonacoEditor
    },
    methods: {
        updateRunkit: function(value, event) {
            this.$refs.runkit.notebook.setSource(this.code);
        }
    }
}
</script>

<style scoped>
.editor {
    height: 1000px;
}
#node {
    padding: 5vw;
}
</style>