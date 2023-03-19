<!-- src/views/Login.vue -->
<template>
    <div class="login">
        <h1>Log in with your Spotify account</h1>
        <button @click="loginWithSpotify">Log in</button>
    </div>
</template>
  
<script>
export default {
    name: 'LoginView',
    methods: {
        loginWithSpotify() {
            const clientId = 'dfcf0367babe40f6bf561a661e991881';
            const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
            const scopes = encodeURIComponent('playlist-read-private playlist-read-collaborative');
            const responseType = 'token';
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=${responseType}`;

            window.location.href = authUrl;
        }
    },
    mounted() {
        const accessToken = localStorage.getItem('spotify_access_token');
        if (accessToken) {
            this.$router.push('/playlist');
        }
    }
}
</script>
  
<style scoped>
/* Add your CSS styles for the login view */
</style>
  