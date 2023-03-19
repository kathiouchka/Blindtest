import { createStore } from 'vuex';

export default createStore({
    state: {
        accessToken: null,
        tracks: null, // Add this state property for tracks
        currentTrackIndex: 0,
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setTracks(state, tracks) { // Add this mutation to update the tracks
            state.tracks = tracks;
        },
        nextTrack(state) {
            state.currentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;
        },
    },
    actions: {},
    modules: {},
});
