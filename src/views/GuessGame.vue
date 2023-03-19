<template>
    <div class="guess-game">
        <h1>Guess the Song</h1>
        <p v-if="!track">Please load a playlist first.</p>
        <div v-else>
            <track-guess-item :track="track" />
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
            const index = Math.floor(Math.random() * this.$store.state.tracks.length);
            return this.$store.state.tracks[index];
        }
    }
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
  