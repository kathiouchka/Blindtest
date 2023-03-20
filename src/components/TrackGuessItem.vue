<!-- src/components/TrackGuessItem.vue -->
<template>
    <div class="track-guess-item">
        <!-- Other elements... -->
        <div v-if="!songCorrect && !artistCorrect">
            <input v-model="songGuess" placeholder="Enter song title" @keyup.enter="checkGuess('song')" />
            <input v-model="artistGuess" placeholder="Enter artist name" @keyup.enter="checkGuess('artist')" />
            <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div v-else>
            <h3>{{ track.name }}</h3>
            <p>{{ track.artists.map(artist => artist.name).join(', ') }}</p>
        </div>
        <button @click="togglePreview">{{ isPlaying ? 'Pause' : 'Preview' }}</button>
        <button @click="skipTrack">Skip</button>
    </div>
</template>
  
  
<script>
export default {
    name: 'TrackGuessItem',
    props: {
        track: Object,
    },
    data() {
        return {
            songGuess: '',
            artistGuess: '',
            error: null,
            songCorrect: false,
            artistCorrect: false,
            totalScore: 0,
            audio: null,
            isPlaying: false,
        };
    },
    methods: {
        togglePreview() {
            if (!this.audio) {
                this.audio = new Audio(this.track.preview_url);
                this.audio.addEventListener('ended', () => {
                    this.isPlaying = false;
                    this.resetGame();
                    this.$emit('decrementTotalSongs'); // Add this line
                });
            }

            if (this.isPlaying) {
                this.audio.pause();
            } else {
                this.audio.play();
            }

            this.isPlaying = !this.isPlaying;
        },
        checkGuess(type) {
            let score = 0;

            if (type === 'song') {
                const guess = this.songGuess.toLowerCase();
                const correctTitle = this.track.name.toLowerCase();

                if (correctTitle === guess && !this.songCorrect) {
                    this.songCorrect = true;
                    this.error = null;
                    score += 1;
                } else {
                    this.error = 'Incorrect song name! Please try again.';
                }
            } else if (type === 'artist') {
                const guess = this.artistGuess.toLowerCase();
                const correctArtists = this.track.artists.map(artist => artist.name.toLowerCase());

                if (correctArtists.some(artist => artist === guess) && !this.artistCorrect) {
                    this.artistCorrect = true;
                    this.error = null;
                    score += 1;
                } else {
                    this.error = 'Incorrect artist name! Please try again.';
                }
            }

            if (this.songCorrect && this.artistCorrect && score < 3) {
                score += 1;
            }

            if (score > 0) {
                this.$emit('updateScore', score);
            }
        },
        skipTrack() {
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.isPlaying = false;
            }
            this.resetGame();
            this.$emit('decrementTotalSongs');
        },

        resetGame() {
            if (this.audio) {
                this.audio.removeEventListener('ended', this.resetGame);
                this.audio = null;
            }

            this.songGuess = '';
            this.artistGuess = '';
            this.error = null;
            this.songCorrect = false;
            this.artistCorrect = false;
            this.totalScore = 0;
            this.isPlaying = false;
            this.$emit('nextTrack');
        },
    },
}
</script>
  
<style scoped>
/* Add your CSS styles for the track guess item component */
.track-guess-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.error {
    color: red;
    margin-top: 1rem;
}
</style>
  