<template>
  <Navbar></Navbar>
  <div id="dashboard">
    <form @submit="cercaInterventi">
      <div>
        <label for="numeroCommessa">Numero Commessa</label>
        <input type="text" id="numeroCommessa" v-model="numeroCommessa" />
      </div>
      <div>
        <label for="idIntervento">ID Intervento</label>
        <input type="text" id="idIntervento" v-model="idIntervento" />
      </div>
      <div>
        <label for="trimestre">Trimestre</label>
        <input type="text" id="trimestre" v-model="trimestre" />
      </div>
      <div>
        <label for="team">Team</label>
        <input type="text" id="team" v-model="team" />
      </div>
      <div>
        <label for="nucleo">Nucleo</label>
        <input type="text" id="nucleo" v-model="nucleo" />
      </div>
      <div>
        <label for="operatore">Operatore</label>
        <input type="text" id="operatore" v-model="operatore" />
      </div>
      <div>
        <label for="statoIntervento">Stato Intervento</label>
        <input type="text" id="statoIntervento" v-model="statoIntervento" />
      </div>
      <button type="submit">Cerca</button>
    </form>
    <div class="content">
      <div class="projects">
        <table>
          <thead>
            <tr>
              <th>Commessa</th>
              <th>ID Intervento</th>
              <th>Stato</th>
              <th>Stima</th>
              <th>Effort</th>
              <th>Operatore</th>
              <th>Trimestre</th>
              <th>Data Inizio</th>
              <th>Data Fine</th>
              <th>In Lavorazione</th>
              <th>GG</th>
              <th>% Avanzamento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="progetto in projects" :key="progetto.id">
              <td>{{ progetto.commessa }}</td>
              <td>{{ progetto.idIntervento }}</td>
              <td>{{ progetto.stato }}</td>
              <td>{{ progetto.stima }}</td>
              <td>{{ progetto.effort }}</td>
              <td>{{ progetto.operatore }}</td>
              <td>{{ progetto.trimestre }}</td>
              <td>{{ progetto.dataInizio }}</td>
              <td>{{ progetto.dataFine }}</td>
              <td>{{ progetto.inLavorazione }}</td>
              <td>{{ progetto.gg }}</td>
              <td>{{ progetto.percentualeAvanzamento }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import mongoose from "mongoose";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      projects: [],
      numeroCommessa: "",
      idIntervento: "",
      trimestre: "",
      team: "",
      nucleo: "",
      operatore: "",
      statoIntervento: "",
    };
  },
  mounted() {
    // Get the list of projects from the database
    this.getProjects();
  },
  methods: {
    cercaInterventi() {
      // Connect to the MongoDB database
      mongoose.connect("mongodb://localhost:27017/gestione-progetti-db");

      // Get the projects collection
      const projectsCollection = mongoose.model("Projects");

      // Get the list of projects
      projectsCollection.find({}, (err, projects) => {
        if (err) {
          console.error(err);
        } else {
          this.projects = projects;
        }
      });
    },
  },
};
</script>

<style>
#dashboard {
  margin: 0 auto;
  width: 100%;
}

nav {
  background-color: #ff0000;
  color: #fff;
  padding: 10px;
}

.content {
  margin-top: 10px;
}

.projects {
  display: flex;
  flex-wrap: wrap;
}

.project {
  margin: 10px;
}

.project__name {
  flex-grow: 1;
}

.project__description {
  flex-grow: 2;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  margin-bottom: 0.5rem;
}

input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

button[type="submit"] {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0069d9;
}
</style>
