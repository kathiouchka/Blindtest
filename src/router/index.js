// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import CallbackView from '@/views/Callback.vue'
import PlaylistView from '@/views/Playlist.vue'
import GuessGameView from '../views/GuessGame.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/callback',
        name: 'Callback',
        component: CallbackView
    },
    {
        path: '/playlist',
        name: 'Playlist',
        component: PlaylistView
    },
    {
        path: '/guess',
        name: 'GuessGame',
        component: GuessGameView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
