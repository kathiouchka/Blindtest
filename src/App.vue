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
    background-color: #f5f5f5;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.centered {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    flex-direction: column;
}

.home-link,
.game-link {
    display: inline-block;
    text-decoration: none;
    color: #3f51b5;
    margin: 0 8px;
    transition: color 0.3s;
}

.home-link:hover,
.game-link:hover {
    color: #5c6bc0;
}

h1,
h3,
p {
    margin: 0.5rem 0;
}

.past-songs {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 20px;
    max-height: 70vh;
    overflow-y: auto;
    background-color: #fff;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

