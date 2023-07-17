<template>
  <nav class="navbar">
    <ul class="navbar-left">
      <li><router-link to="/">Home</router-link></li>
      <!-- Aggiungi altre pagine qui -->
    </ul>
    <ul class="navbar-right">
      <li><button @click="logout">Logout</button></li>
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
  background-color: #f2f2f2;
  padding: 10px;
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
</style>