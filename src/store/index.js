import { createStore } from 'vuex';

export default createStore({
    state: {
        accessToken: null,
        tracks: null, // Add this state property for tracks
        currentTrackIndex: 0,
        numberOfSongs: 0,
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setTracks(state, tracks) {
            state.tracks = tracks;
        },
        SET_NUMBER_OF_SONGS(state, numberOfSongs) {
            state.numberOfSongs = numberOfSongs;
        },
        nextTrack(state) {
            state.currentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;
        },
        DECREMENT_TOTAL_SONGS(state) {
            state.numberOfSongs--;
        },
    },
    actions: {},
    modules: {},
});
