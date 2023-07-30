<template>
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
</template>
  
<script>
import { RouterView } from 'vue-router';
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export default {
    name: 'MainContainer',
    components: {
        Navbar,
        Footer
    }
};
</script>