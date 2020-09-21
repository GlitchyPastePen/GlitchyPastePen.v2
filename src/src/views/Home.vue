<template>
    <div class="home">
        <div id="intro">
            <h1 class="main">
                GlitchyPastePen.
            </h1>
            <p class="desc">
                Create simple front-end projects, mainly with HTML, CSS and JS using an online code editor and instantly host it.
            </p>
            <center>
                <img
                src="https://cdn.glitch.com/622554c6-3118-4838-8819-e003b9525f5d%2Fscreely-1591191781898.png?v=1591191852875"
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
        font-size: calc(100vw / 12.8);
        font-weight: 740;
        text-align: center;
        font-family: "Inter", sans-serif;
    }

    #intro {
        margin-left: 50px;
        margin-right: 50px;
        border: 5px dashed yellow;
        margin-top: 50px;
        border-radius: 5px;
        background-color: #272822;
        color: white;
    }

    .desc {
        margin-left: 15%;
        margin-right: 15%;
        font-size: calc(35vw / 12.8);
        font-family: "Fira Mono", "IBM Plex Mono", monospace;
    }

</style>