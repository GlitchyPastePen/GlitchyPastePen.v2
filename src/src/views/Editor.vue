<template>
    <span>
        <AceEditor />
    </span>
</template>

<script>

    import AceEditor from "@/components/AceEditor.vue";

    export default {
        name: 'Editor',
        data: function() {
            return {
                project_name: this.$route.params.user || null
            }
        },
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