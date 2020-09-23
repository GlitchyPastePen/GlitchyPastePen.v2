<template>
    <AceEditor />
</template>

<script>

    import AceEditor from "@/components/AceEditor.vue";

    export default {
        name: 'Editor',
        components: {
            AceEditor
        }
    }

</script>

<style>

    header {
        display: none !important;
    }

</style>