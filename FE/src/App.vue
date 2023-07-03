<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from "./router";

export default {
  name: 'App',
  router,
  data() {
    return {
      isLoggedIn: false,
      pageTitle: 'Homepage',
    };
  },
  methods: {
    login() {
      // Logica per eseguire l'accesso dell'utente
      this.isLoggedIn = true;
    },
    logout() {
      // Logica per eseguire il logout dell'utente
      this.isLoggedIn = false;
    },
  },
  computed: {
    welcomeMessage() {
      return this.isLoggedIn ? 'Benvenuto!' : 'Effettua il login per continuare.';
    },
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue) {
        console.log('L\'utente ha effettuato l\'accesso.');
      } else {
        console.log('L\'utente ha eseguito il logout.');
      }
    },
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  /*margin-top: 60px;*/
}
</style>
