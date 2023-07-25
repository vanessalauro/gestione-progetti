<template>
  <Navbar></Navbar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      pageTitle: 'Homepage',
    }
  }
});
</script>
