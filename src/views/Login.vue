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
        const tokenExpiration = localStorage.getItem('spotify_access_token_expiration');

        if (accessToken && tokenExpiration && new Date(tokenExpiration) > new Date()) {
            this.$router.push('/playlist');
        } else {
            // Clear the expired token if it exists
            localStorage.removeItem('spotify_access_token');
            localStorage.removeItem('spotify_access_token_expiration');
        }
    }
}
</script>
  
<style scoped>
/* Add your CSS styles for the login view */
</style>
  