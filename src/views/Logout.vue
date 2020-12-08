<template>
    <center>
        <h2>Are you sure you wanna log out?</h2>
        <button id="logout" @click="logout()">
            YES. LOG OUT.
        </button>
    </center>
</template>

<script>

    export default {
        name: 'Logout',
        data: function() {
            return {

            }
        },
        methods: {
            logout: function() {
                this.$store.commit('logIn', false);
                this.$store.commit('resetUser');
                this.$store.commit('resetAccessToken');
                this.$router.push('/');
            }
        }
    }

</script>

<style scoped>

    #logout {
        padding: 20px 40px;
        border-radius: 5px;
        font-size: 18px;
    }

</style>