<!-- src/components/TrackGuessItem.vue -->
<template>
    <div class="track-guess-item">
        <img :src="track.album.images[0].url" :alt="track.name" />
        <div v-if="!isCorrect">
            <input v-model="guess" placeholder="Enter song title and artist" />
            <button @click="checkGuess">Submit</button>
            <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div v-else>
            <h3>{{ track.name }}</h3>
            <p>{{ track.artists.map(artist => artist.name).join(', ') }}</p>
        </div>
        <button @click="togglePreview">{{ isPlaying ? 'Stop' : 'Preview' }}</button>
    </div>
</template>
  
<script>
export default {
    name: 'TrackGuessItem',
    props: {
        track: Object
    },
    data() {
        return {
            guess: '',
            error: null,
            isCorrect: false,
            audio: null,
            isPlaying: false
        };
    },
    methods: {
        togglePreview() {
            if (!this.audio) {
                this.audio = new Audio(this.track.preview_url);
                this.audio.addEventListener('ended', () => {
                    this.isPlaying = false;
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
            const guessTitleAndArtist = this.guess.toLowerCase();
            const correctTitleAndArtist = `${this.track.name.toLowerCase()} ${this.track.artists.map(artist => artist.name.toLowerCase()).join(' ')}`;

            if (guessTitleAndArtist === correctTitleAndArtist) {
                this.isCorrect = true;
                this.error = null;
            } else {
                this.error = 'Incorrect! Please try again.';
            }
        }
    },
    beforeUnmount() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
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

.track-guess-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 1rem;
}

.error {
    color: red;
    margin-top: 1rem;
}
</style>
  