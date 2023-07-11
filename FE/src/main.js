import './assets/main.css'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import Alert from './shared/Alert.vue';
import { createVuetify } from 'vuetify';
import Navbar from './shared/Navbar.vue';
import Footer from './shared/Footer.vue';

const app = createApp(App);
app.use(router);
// app.use(Alert);
app.use(Navbar);
app.use(Footer);
app.use(createVuetify());
app.mount('#app');
