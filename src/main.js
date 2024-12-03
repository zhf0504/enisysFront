import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; //  Vuetifyのインポート
import router from './router';
import store from './store';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.use(store);
app.use(vuetify); // Vuetifyの使用
app.use(router);
app.mount('#app');
