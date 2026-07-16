import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);
// Ensure devtools are enabled in development so the Vue tab appears in browser DevTools
if (import.meta.env.DEV) {
	app.config.devtools = true;
}

app.use(router).mount('#app');
