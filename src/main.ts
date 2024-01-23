import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './routes';

import { createPinia } from 'pinia';

loadFonts();

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);

app.use(vuetify).mount('#app');
