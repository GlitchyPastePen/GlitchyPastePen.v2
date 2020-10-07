<template>
    <div class="home">
        <div id="intro">
            <h1 class="main">
                GlitchyPastePen.
            </h1>
            <p class="desc">
                Create and test HTML, CSS and Javascript code snippets with an online code editor & hosting.
            </p>
            <center>
                <img
                src="https://cdn.khaleelgibran.com/glitchypastepen_preview.png"
                width="100%"
                />
            </center>
        </div>
        <Footer />
    </div>
</template>

<script>

    import Footer from "@/components/Footer.vue";

    export default {
        name: 'Home',
        components: {
            Footer
        }
    }

</script>

<style scoped>

    .main {
        font-size: calc(80vw / 12.8);
        font-weight: 740;
        text-align: center;
        font-family: "Inter", sans-serif;
    }

    #intro {
        margin-left: 50px;
        margin-right: 50px;
        margin-top: 50px;
        border-radius: 5px;
        color: white;
    }

    .desc {
        margin-left: 15%;
        margin-right: 15%;
        font-size: calc(35vw / 12.8);
        font-family: "Fira Mono", "IBM Plex Mono", monospace;
        text-align: center;
    }

</style>