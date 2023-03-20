<template>
    <div class="guess-game">
        <h1>Guess the Song</h1>
        <p>Total Score: {{ totalScore }}</p>
        <p>Number of songs in the playlist: {{ numberOfSongs }}</p>
        <p v-if="!track">Please load a playlist first.</p>
        <div v-else>
            <track-guess-item :track="track" @nextTrack="nextTrack" @updateScore="updateScore"
                @decrementTotalSongs="decrementTotalSongs" @addToHistory="addToHistory" />
        </div>
    </div>
</template>

  
  
  
  
<script>
import TrackGuessItem from '../components/TrackGuessItem.vue';

export default {
    name: 'GuessGame',
    components: {
        TrackGuessItem
    },
    computed: {
        track() {
            return this.$store.state.tracks[this.$store.state.currentTrackIndex];
        },
        numberOfSongs() {
            return this.$store.state.numberOfSongs;
        },
    },
    methods: {
        nextTrack() {
            if (this.$store.state.currentTrackIndex + 1 < this.$store.state.tracks.length) {
                this.$store.dispatch("addToHistory");
                this.$store.commit('nextTrack');
            } else {
                alert('Game over! Playlist ended.');
            }
        },
        decrementTotalSongs() {
            this.$store.commit('DECREMENT_TOTAL_SONGS');
        },
        updateScore(score) {
            this.totalScore += score;
        },
        addToHistory() {
            this.$store.dispatch("addToHistory");
        },
    },
    data() {
        return {
            totalScore: 0,
        };
    },
};
</script>
  
<style scoped>
.guess-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #ffffff;
}

h1 {
    margin-bottom: 1rem;
    font-size: 3rem;
    color: #3f51b5;
    text-transform: uppercase;
}

p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333;
}

.track-guess-item+.track-guess-item {
    margin-top: 1rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1.2rem;
    color: #333;
}

button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #3f51b5;
    color: white;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #5c6bc0;
}

.countdown-progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.countdown {
    font-size: 1.5rem;
    color: #3f51b5;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 3px;
}

.progress {
    height: 10px;
    background-color: #3f51b5;
    border-radius: 3px;
}

.error {
    color: red;
    margin-top: 1rem;
    font-size: 1.2rem;
}
</style>

  