<!-- src/views/Playlist.vue -->
<template>
    <div class="playlist">
        <input v-model="playlistId" placeholder="Enter playlist URL or ID" />
        <button @click="fetchPlaylist">Load Playlist</button>
        <p class="error" v-if="error">{{ error }}</p>
        <div v-if="playlistName">
            <h2>{{ playlistName }}</h2>
            <router-link to="/guess">
                <button>Start Game</button>
            </router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "PlaylistView",
    data() {
        return {
            playlistId: localStorage.getItem("last_playlist_id") || "",
            tracks: [],
            error: null,
            playlistName: null,
        };
    },
    methods: {
        shuffleTracks(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        async fetchPlaylist() {
            const accessToken = localStorage.getItem("spotify_access_token");
            if (!accessToken) {
                this.$router.push("/login");
                return;
            }

            const urlMatch = this.playlistId.match(
                /(?:https:\/\/open\.spotify\.com\/playlist\/)?([a-zA-Z0-9]+)(?:\?.*)?/
            );
            const id = urlMatch ? urlMatch[1] : null;
            if (!id) {
                this.error = "Invalid playlist URL or ID";
                return;
            }

            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/playlists/${id}/tracks`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    this.error =
                        "Error fetching playlist. Please check the playlist URL or ID.";
                    return;
                }

                const data = await response.json();
                const shuffledTracks = this.shuffleTracks(
                    data.items.map((item) => item.track)
                );
                this.tracks = shuffledTracks;
                this.$store.commit("setTracks", this.tracks); // Commit the tracks to the Vuex store
                this.$store.commit("SET_NUMBER_OF_SONGS", this.tracks.length); // Add this line

                // Fetch playlist name
                const playlistResponse = await fetch(
                    `https://api.spotify.com/v1/playlists/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const playlistData = await playlistResponse.json();
                this.playlistName = playlistData.name;

                // Store the last playlist ID
                localStorage.setItem("last_playlist_id", id);
                this.error = null;
            } catch (error) {
                console.error("Error fetching playlist:", error);
                this.error = "Error fetching playlist. Please check the playlist URL or ID.";
            }
        },
    },
    mounted() {
        if (this.playlistId) {
            this.fetchPlaylist();
        }
    },
};
</script>
  
<style scoped>
.error {
    color: red;
    margin-top: 1rem;
}
</style>
  