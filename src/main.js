import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import './index.css'
import resetStore from './store/plugins/storeReset'

import Notifications from '@kyvg/vue3-notification'


const app = createApp(App);

app.use(createPinia().use(resetStore))
app.use(router);
app.use(Notifications)
app.mount("#app");
