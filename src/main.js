import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Update this line to import from './store'

createApp(App)
    .use(router)
    .use(store) // Add the store to the Vue app
    .mount('#app');
