import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { VueSignaturePad } from 'vue-signature-pad';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('VueSignaturePad', VueSignaturePad);

app.mount('#app');
