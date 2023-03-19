<!-- src/views/GuessGame.vue -->
<template>
    <div class="guess-game">
        <h1>Guess the Song</h1>
        <p v-if="!tracks">Please load a playlist first.</p>
        <div v-else>
            <track-guess-item v-for="track in tracks" :key="track.id" :track="track" />
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
        tracks() {
            return this.$store.state.tracks;
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
  