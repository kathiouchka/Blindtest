import { createStore } from 'vuex';

export default createStore({
    state: {
        accessToken: null,
        tracks: null, // Add this state property for tracks
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setTracks(state, tracks) { // Add this mutation to update the tracks
            state.tracks = tracks;
        },
    },
    actions: {},
    modules: {},
});
