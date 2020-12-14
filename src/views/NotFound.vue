<template>
    <div>
        <center>
            <img src="@/assets/not-found.svg" />
            <p>
                Go back <router-link to="/">home</router-link>?
            </p>
        </center>
        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
    name: 'NotFound',
    components: {
        Footer
    }
}
</script>

<style scoped>
img {
    margin-top: 50px;
    margin-bottom: 50px;
}

a {
    color: inherit;
}

p {
    font-family: "Fira Code", "Fira Mono", "IBM Plex Mono", monospace;
    font-size: 26px;
    margin-bottom: 100px;
}
</style>