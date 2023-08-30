<template>
  <nav class="navbar">
    <ul class="navbar-left">
      <li><router-link to="/">Home</router-link></li>
      <!-- Aggiungi altre pagine qui -->
    </ul>
    <ul class="navbar-right">
      <li>
        <button @click="logout" class="btn btn-danger">
          <i class="mdi mdi-logout"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>
  
<script>
import axios from "axios";

export default {
  name: "Navbar",
  methods: {
    logout() {
      // Logica per eseguire il logout dell'utente
      // Puoi implementare qui la tua logica per il logout
      axios.post("http://localhost:3000/logout").then(() => {
        // Redirect to the login page
        this.$router.push("/login");
      });
    }
  }
}
</script>
  
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.navbar ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  margin-right: 10px;
}

.navbar-right {
  margin-left: auto;
}

.navbar li {
  display: inline-block;
  padding: 10px 20px;
}

.navbar li a {
  color: #000;
  text-decoration: none;
}

.navbar li a:hover {
  color: #fff;
  background-color: #ccc;
}
</style>