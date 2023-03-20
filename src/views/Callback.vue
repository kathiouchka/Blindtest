<!-- src/views/Callback.vue -->
<template>
    <div class="callback">
        <!-- You can show a loading spinner or a message while processing the callback -->
        <p>Processing...</p>
    </div>
</template>
  
<script>
export default {
    name: 'CallbackView',
    mounted() {
        const hash = window.location.hash.substr(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const expiresIn = Number(new URLSearchParams(window.location.hash.substring(1)).get('expires_in'));
        const expirationDate = new Date();

        expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
        localStorage.setItem('spotify_access_token_expiration', expirationDate.toString());

        if (accessToken) {
            // Store the access token in a Vuex store, Vue component, or localStorage
            localStorage.setItem('spotify_access_token', accessToken);
            localStorage.setItem('spotify_expires_in', expiresIn);

            // Redirect to the playlist view or another view as desired
            this.$router.push('/playlist');
        } else {
            // Handle errors, such as the user denying access or an invalid token
            this.$router.push('/login');
        }
    }
}
</script>
  