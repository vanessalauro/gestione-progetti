<template>
  <!--<nav class="navbar">
    <ul class="nav">
      <li class="nav-item active">
        <button type="button" class="btn btn-dash" v-bind:class="{ active: true }">Dashboard</button>
      </li>
    </ul>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <button @click="logout" class="btn btn-danger">
          <i class="mdi mdi-bell"></i>
        </button>
      </li>
      <li class="nav-item">
        <button @click="logout" class="btn btn-danger">
          <i class="mdi mdi-logout"></i>
        </button>
      </li>
    </ul>
  </nav>-->
  <!--<ul id="section-tabs" class="nav d-md-flex px-3">
    <li class="nav-item d-flex align-items-center pointer">
      <span class="nav-link">Dashboard</span>
    </li>
    <li class="nav-item d-flex align-items-center pointer">
      <span class="nav-link">Notifiche</span>
    </li>
    <li class="nav-item d-flex align-items-center pointer">
      <span class="nav-link">Logout</span>
    </li>
  </ul>-->
  <!--<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/container/dashboard">Dashboard</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/container/notifiche">
            <i class="mdi mdi-bell"></i>
            <span class="badge">3</span>
          </router-link>
        </li>
        <li class="nav-item dropdown right">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" @click="logout()">
            <i class="mdi mdi-logout"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>


      </ul>
      <form class="form-inline my-2 my-lg-0">

      </form>
    </div>
  </nav>-->

  <v-toolbar class="navbar navbar-expand-lg navbar-light bg-light" density="compact" :elevation="8">

    <v-toolbar-title>
      <v-btn @click="goToDashboard()">
        Gestione Progetti
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    
    <v-btn icon @click="goToNotifiche()">
      <i class="mdi mdi-bell"></i>
      <span class="badge">{{ countNotifiche }}</span>
    </v-btn>

    <v-btn icon @click="logout()">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>
  
<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      countNotifiche: 0
    }
  },
  mounted() {
    this.getCountNotifiche();
  },
  methods: {
    getCountNotifiche() {
      axios.get("http://localhost:3000/countNotifiche").then((response) => {
        console.log("Risposta GET:", response.data);
        this.countNotifiche = response.data.count;
      });
    },
    goToNotifiche() {
      this.$router.push("/container/notifiche");
    },
    goToDashboard() {
      this.$router.push("/container/dashboard");
    },
    logout() {
      // Effettua il logout
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      const authorization = localStorage.getItem("Authorization");

      // Logica per eseguire il logout dell'utente
      // Puoi implementare qui la tua logica per il logout
      axios.post("http://localhost:3000/logout", { username, password, authorization }).then(() => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("Authorization");
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

.btn-dash {
  background-color: #c1efef;
  color: black;
  border: none;
  border-radius: 0%;
  border-bottom: white 3px solid;
}

#section-tabs {
  background-image: linear-gradient(to right, #c1efef, #daf3f3);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 53px;
  user-select: none;

  .nav-item {
    color: white;
    font-weight: bold;


    &.active {
      border-bottom: 4px solid white;
    }

    &:hover {
      background-color: rgba(white, 0.1);
    }
  }

  .nav-link {
    color: black !important;
  }
}

span .badge {
  background-color: #9ff8f8 !important;
  font-size: 12px;
  z-index: 1001;
  color: white !important;
}
</style>