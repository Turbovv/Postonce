import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './routes'

loadFonts()

createApp(App)
  .use(router) // Use the router plugin
  .use(vuetify)
  .mount('#app')