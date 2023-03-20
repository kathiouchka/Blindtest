<!-- src/components/TrackGuessItem.vue -->
<template>
    <div class="track-guess-item-wrapper">
        <div class="track-guess-item">
            <!-- Other elements... -->
            <div v-if="!(songCorrect && artistCorrect)">
                <input v-model="combinedGuess" placeholder="Enter song title and/or artist name"
                    @keyup.enter="checkGuess" />
                <p class="error" v-if="error">{{ error }}</p>
            </div>
            <div>
                <h3 v-if="songCorrect && artistCorrect">{{ track.name }}</h3>
                <p v-if="songCorrect && artistCorrect">{{ track.artists.map(artist => artist.name).join(', ') }}</p>
                <img v-if="songCorrect && artistCorrect" :src="track.album.images[0].url" alt="Album cover" />
            </div>

            <button @click="togglePreview">{{ isPlaying ? 'Pause' : 'Preview' }}</button>
        </div>
        <div class="countdown-progress">
            <div class="countdown">{{ countdown }}</div>
            <div class="progress-bar">
                <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
        </div>
    </div>
</template>
  
  
  
<script>
export default {
    name: 'TrackGuessItem',
    emits: ['nextTrack', 'updateScore', 'decrementTotalSongs', 'addToHistory'],
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
            countdown: 10,
            progress: 0,
            previewTimeout: null,
            countdownInterval: null,
            progressInterval: null,
        };
    },
    methods: {
        startCountdown() {
            this.countdown = 10;
            const updateCountdown = () => {
                this.countdown -= 1;
                if (this.countdown >= 0) {
                    setTimeout(updateCountdown, 1000);
                }
                else {
                    this.countdown = 0;
                }
            };
            setTimeout(updateCountdown, 1000);
        },

        startProgressBar() {
            this.progress = 0;
            const updateProgress = () => {
                this.progress += 10;
                if (this.progress <= 100) {
                    setTimeout(updateProgress, 1000);
                }
                else {
                    this.progress = 100
                }
            };
            setTimeout(updateProgress, 1000);
        },

        resetCountdown() {
            clearInterval(this.countdownInterval);
            clearInterval(this.progressInterval);
        },

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
                clearTimeout(this.previewTimeout);
                this.resetCountdown();
            } else {
                this.audio.play();
                this.startCountdown();
                this.startProgressBar();
                this.previewTimeout = setTimeout(() => {
                    this.audio.pause();
                    this.audio.currentTime = 0;
                    this.isPlaying = false;
                    this.resetCountdown();
                    this.resetGame();
                    this.$emit('decrementTotalSongs');
                }, 10000); // 10 seconds
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
.track-guess-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.track-guess-item input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.track-guess-item button {
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

.track-guess-item button:hover {
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
</style>

  