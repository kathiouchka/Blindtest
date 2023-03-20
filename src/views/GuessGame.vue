<template>
    <div class="guess-game">
        <h1>Guess the Song</h1>
        <p>Total Score: {{ totalScore }}</p>
        <p>Number of songs in the playlist: {{ numberOfSongs }}</p>
        <p v-if="!track">Please load a playlist first.</p>
        <div v-else>
            <track-guess-item :track="track" @nextTrack="nextTrack" @updateScore="updateScore"
                @decrementTotalSongs="decrementTotalSongs" />
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
            this.$store.commit('nextTrack');
        },
        decrementTotalSongs() {
            this.$store.commit('DECREMENT_TOTAL_SONGS');
        },
        updateScore(score) {
            this.totalScore += score;
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
}

.track-guess-item+.track-guess-item {
    margin-top: 1rem;
}
</style>
  