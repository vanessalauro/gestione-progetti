import './assets/main.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Navbar from './shared/Navbar.vue';
import Footer from './shared/Footer.vue';
// Importa il file CSS di @mdi/font
import '@mdi/font/css/materialdesignicons.min.css';
import 'vuetify/dist/vuetify.min.css'; // Importa i CSS di Vuetify
import { createVfm } from 'vue-final-modal';
import 'vue-final-modal/style.css';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import 'vuetify/dist/vuetify.min.css';

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
});

app.use(vuetify);

const vfm = createVfm()
app.use(vfm);

// Registra i componenti Navbar e Footer come globali
app.component('Navbar', Navbar);
app.component('Footer', Footer);

app.use(router);

// console.log(Vuetify);

app.mount('#app');
