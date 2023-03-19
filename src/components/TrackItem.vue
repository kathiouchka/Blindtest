<template>
    <div class="track-item">
        <img :src="track.album.images[0].url" :alt="track.name" />
        <div class="track-info">
            <h3>{{ track.name }}</h3>
            <p>{{ track.artists.map(artist => artist.name).join(', ') }}</p>
            <button @click="togglePreview">{{ isPlaying ? 'Stop' : 'Preview' }}</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'TrackItem',
    props: {
        track: Object
    },
    data() {
        return {
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
.track-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.track-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 1rem;
}

.track-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* Change this from 'center' to 'flex-start' */
    width: 100%;
}
</style>

  