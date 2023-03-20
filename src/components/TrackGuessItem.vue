<!-- src/components/TrackGuessItem.vue -->
<template>
    <div class="track-guess-item">
        <!-- Other elements... -->
        <div v-if="!(songCorrect && artistCorrect)">
            <input v-model="combinedGuess" placeholder="Enter song title and/or artist name" @keyup.enter="checkGuess" />
            <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div>
            <h3 v-if="songCorrect && artistCorrect">{{ track.name }}</h3>
            <p v-if="songCorrect && artistCorrect">{{ track.artists.map(artist => artist.name).join(', ') }}</p>
            <img v-if="songCorrect && artistCorrect" :src="track.album.images[0].url" alt="Album cover" />
        </div>

        <button @click="togglePreview">{{ isPlaying ? 'Pause' : 'Preview' }}</button>
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
            combinedGuess: '',
            error: null,
            songCorrect: false,
            artistCorrect: false,
            totalScore: 0,
            audio: null,
            isPlaying: false,
            resetInProgress: false,
        };
    },
    methods: {
        togglePreview() {
            if (!this.audio) {
                this.audio = new Audio(this.track.preview_url);
                this.audio.addEventListener('ended', () => {
                    this.isPlaying = false;
                    this.resetGame();
                    this.$emit('decrementTotalSongs');
                });
            }

            if (this.isPlaying) {
                this.audio.pause();
            } else {
                this.audio.play();
            }

            this.isPlaying = !this.isPlaying;
        },
        checkGuess() {
            let score = 0;

            const correctTitle = this.track.name.toLowerCase();
            const correctArtists = this.track.artists.map(artist => artist.name.toLowerCase());

            const combinedGuessWords = this.combinedGuess.toLowerCase().trim().split(' ');

            let songGuess = '';
            let artistGuess = '';

            for (const word of combinedGuessWords) {
                if (correctTitle.includes(word) && !this.songCorrect) {
                    songGuess += word + ' ';
                }
                if (correctArtists.some(artist => artist.includes(word)) && !this.artistCorrect) {
                    artistGuess += word + ' ';
                }
            }

            songGuess = songGuess.trim();
            artistGuess = artistGuess.trim();

            if (correctTitle === songGuess && !this.songCorrect) {
                this.songCorrect = true;
                score += 1;
            }

            if (correctArtists.some(artist => artist === artistGuess) && !this.artistCorrect) {
                this.artistCorrect = true;
                score += 1;
            }

            if (this.songCorrect && this.artistCorrect) {
                score += 1;
                this.togglePreview();
                setTimeout(async () => {
                    this.resetGame();
                    this.$emit('decrementTotalSongs');
                }, 5000);
            } else {
                if (score === 0) {
                    this.error = 'Incorrect song name or artist! Please try again.';
                } else {
                    this.error = null;
                }
            }

            if (score > 0) {
                this.$emit('updateScore', score);
            }

            this.combinedGuess = '';
        },

        resetGame() {
            if (this.resetInProgress) {
                return;
            }
            this.resetInProgress = true;

            if (this.audio) {
                this.audio.removeEventListener('ended', this.resetGame);
                this.audio = null;
            }

            this.error = null;
            this.songCorrect = false;
            this.artistCorrect = false;
            this.totalScore = 0;
            this.isPlaying = false;
            this.$emit('nextTrack');

            setTimeout(() => {
                this.resetInProgress = false;
            }, 100);
        },
    }
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
  