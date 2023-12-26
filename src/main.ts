import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './routes';

// Import Pinia and createPinia from Pinia
import { createPinia } from 'pinia';

loadFonts();

const app = createApp(App);

// Use createPinia to initialize Pinia
const pinia = createPinia();
app.use(pinia);

// Use the router plugin
app.use(router);

app.use(vuetify).mount('#app');
