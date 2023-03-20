<template>
    <div id="app">
        <div class="container">
            <div class="centered">
                <router-link to="/playlist" class="home-link">Playlist</router-link>
                <router-link to="/guess" class="game-link">Guess Game</router-link>
                <router-view></router-view>
            </div>
            <div class="past-songs" v-if="$route.path === '/guess'">
                <h2>Past Songs</h2>
                <ul>
                    <li v-for="(song, index) in pastSongs" :key="index">{{ song }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "App",
    data() {
        return {
            pastSongs: [],
        };
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === "ADD_TO_HISTORY") {
                const track = state.tracks[state.currentTrackIndex];
                if (track) {
                    const song = `${track.name} - ${track.artists
                        .map((artist) => artist.name)
                        .join(", ")}`;
                    this.pastSongs.push(song);
                }
            }
        });
    },
}

</script>
  
    
    
<style>
body {
    background-color: #927272;
    color: #f0f0f0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

input {
    background-color: #771a1a;
    border: 1px solid #444;
    border-radius: 4px;
    color: #f0f0f0;
    padding: 6px 12px;
    margin: 0 4px;
}

button {
    background-color: #4a4a4a;
    border: 1px solid #444;
    border-radius: 4px;
    color: #f0f0f0;
    cursor: pointer;
    padding: 6px 12px;
    margin: 0 4px;
}

button:hover {
    background-color: #5a5a5a;
}

button:active {
    background-color: #3a3a3a;
}

h1,
h3,
p {
    margin: 0.5rem 0;
}

.guess-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}

.past-songs {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 20px;
    max-height: 70vh;
    overflow-y: auto;
}

.past-songs h2 {
    margin-bottom: 10px;
}

.past-songs ul {
    list-style-type: none;
    padding: 0;
}

.past-songs li {
    margin-bottom: 5px;
}
</style>
