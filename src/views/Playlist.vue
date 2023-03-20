<!-- src/views/Playlist.vue -->
<template>
    <div class="playlist">
        <input v-model="playlistId" placeholder="Enter playlist URL or ID" />
        <button @click="fetchPlaylist">Load Playlist</button>
        <p class="error" v-if="error">{{ error }}</p>
        <track-item v-for="track in tracks" :key="track.id" :track="track"></track-item>
    </div>
</template>
  
<script>
import TrackItem from '@/components/TrackItem.vue';

export default {
    name: 'PlaylistView',
    components: {
        TrackItem
    },
    data() {
        return {
            playlistId: localStorage.getItem('last_playlist_id') || '',
            tracks: [],
            error: null
        };
    },
    methods: {
        async fetchPlaylist() {
            const accessToken = localStorage.getItem('spotify_access_token');
            if (!accessToken) {
                this.$router.push('/login');
                return;
            }

            const urlMatch = this.playlistId.match(
                /(?:https:\/\/open\.spotify\.com\/playlist\/)?([a-zA-Z0-9]+)(?:\?.*)?/
            );
            const id = urlMatch ? urlMatch[1] : null;
            if (!id) {
                this.error = 'Invalid playlist URL or ID';
                return;
            }

            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    this.error = 'Error fetching playlist. Please check the playlist URL or ID.';
                    return;
                }

                const data = await response.json();
                this.tracks = data.items.map(item => item.track);
                this.$store.commit('setTracks', this.tracks); // Commit the tracks to the Vuex store
                this.$store.commit('SET_NUMBER_OF_SONGS', this.tracks.length); // Add this line

                // Store the last playlist ID
                localStorage.setItem('last_playlist_id', id);
                this.error = null;
            } catch (error) {
                console.error('Error fetching playlist:', error);
                this.error = 'Error fetching playlist. Please check the playlist URL or ID.';
            }
        }
    },
    mounted() {
        if (this.playlistId) {
            this.fetchPlaylist();
        }
    }
};
</script>
  
<style scoped>
.error {
    color: red;
    margin-top: 1rem;
}
</style>
  