import { createStore } from 'vuex';

export default createStore({
    state: {
        accessToken: null,
        tracks: null,
        currentTrackIndex: 0,
        numberOfSongs: 0,
        tracksHistory: [], // Add this state property for tracksHistory
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        ADD_TO_HISTORY(state) {
            if (state.currentTrackIndex > 0) {
                state.tracksHistory.push(state.tracks[state.currentTrackIndex - 1]);
            }
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
    actions: {
        addToHistory({ commit }) {
            commit("ADD_TO_HISTORY");
        },
    },
    modules: {},
});
