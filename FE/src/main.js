import './assets/main.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import Navbar from './shared/Navbar.vue';
import Footer from './shared/Footer.vue';
// Importa il file CSS di @mdi/font
import '@mdi/font/css/materialdesignicons.min.css';
import 'vuetify/dist/vuetify.min.css'; // Importa i CSS di Vuetify

const app = createApp(App);

// Registra i componenti Navbar e Footer come globali
app.component('Navbar', Navbar);
app.component('Footer', Footer);

app.use(router);
app.use(createVuetify());

app.mount('#app');
