<!--<Navbar></Navbar>-->
<template>
  <div id="dashboard" class="align-items-start">
    <form>
      <div class="card mt-3">
        <div class="card-header align-text-start">
          <h4>Ricerca Progetti</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="numeroCommessa">Numero Commessa</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <input type="text" id="numeroCommessa" v-model="numeroCommessa" />
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="idIntervento">ID Intervento</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <input type="text" id="idIntervento" v-model="idIntervento" />
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="trimestre">Trimestre</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <input type="text" id="trimestre" v-model="trimestre" />
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="team">Team</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <input type="text" id="team" v-model="team" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="nucleo">Nucleo</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="col-md-12">
                    <input type="text" id="nucleo" v-model="nucleo" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="operatore">Operatore</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <input type="text" id="operatore" v-model="operatore" />
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="statoIntervento">Stato Intervento</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <input type="text" id="statoIntervento" v-model="statoIntervento" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button type="submit" @click="cercaInterventi">Cerca</button>
        </div>
      </div>
    </form>
    <!--
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
    </form>-->
    <div class="content mt-3" v-if="viewSearch">
      <div class="card">
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Commessa</th>
                <th scope="col">ID Intervento</th>
                <th scope="col">Stato</th>
                <th scope="col">Stima</th>
                <th scope="col">Effort</th>
                <th scope="col">Operatore</th>
                <th scope="col">Trimestre</th>
                <th scope="col">Data Inizio</th>
                <th scope="col">Data Fine</th>
                <th scope="col">In Lavorazione</th>
                <th scope="col">GG</th>
                <th scope="col">% Avanzamento</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="progetto in projects" :key="progetto.id">
                <td>
                  <button @click="editProject(progetto.id)">Modifica Progetto</button>
                </td>
                <td>{{ progetto.commessa }}</td>
                <td>{{ progetto.idIntervento }}</td>
                <td>{{ progetto.stato }}</td>
                <td>{{ progetto.stima }}</td>
                <td>{{ progetto.effort }}</td>
                <td>{{ progetto.operatore }}</td>
                <td>{{ progetto.trimestre }}</td>
                <td>{{ progetto.dataInizio }}</td>
                <td>{{ progetto.dataFine }}</td>
                <td>
                  <input type="checkbox" v-model="progetto.inLavorazione" @click="editLavorazione(progetto.id)" />
                </td>
                <td>{{ progetto.gg }}</td>
                <td>{{ progetto.percentualeAvanzamento }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--<div class="projects">
        <table>
          <thead>
            <tr>
              <th></th>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="progetto in projects" :key="progetto.id">
              <td>
                <button @click="editProject(progetto.id)">Modifica Progetto</button>
              </td>
              <td>{{ progetto.commessa }}</td>
              <td>{{ progetto.idIntervento }}</td>
              <td>{{ progetto.stato }}</td>
              <td>{{ progetto.stima }}</td>
              <td>{{ progetto.effort }}</td>
              <td>{{ progetto.operatore }}</td>
              <td>{{ progetto.trimestre }}</td>
              <td>{{ progetto.dataInizio }}</td>
              <td>{{ progetto.dataFine }}</td>
              <td>
                <input type="checkbox" v-model="progetto.inLavorazione" @click="editLavorazione(progetto.id)" />
              </td>
              <td>{{ progetto.gg }}</td>
              <td>{{ progetto.percentualeAvanzamento }}</td>
            </tr>
          </tbody>
        </table>
      </div>-->
    </div>
  </div>
</template>
<!--<Footer></Footer>-->

<script>
import mongoose from "mongoose";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

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
      viewSearch: true
    };
  },
  mounted() {
    // Get the list of projects from the database
    // this.getProjects();
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
          this.viewSearch = true;
          this.projects = projects;
        }
      });
    },
    editProject(id) {
      this.$router.push({ name: "EditProject", params: { id: id } });
    },
    editLavorazione(id) {
      const projectData = {
        inLavorazione: this.inLavorazione
      };

      // Opzioni di configurazione della richiesta
      const projectOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      };

      // Effettua la chiamata API al percorso '/api/login'
      axios.post('http://localhost:3000/projects/' + id, projectOptions)
        .then(response => {
          console.log('response: ', response);
        })
        .then(data => {
          // La richiesta è stata eseguita con successo
          console.log('data:', data);
          console.log('Chiamata POST riuscita:', response.data);
          // Esegui le azioni necessarie in caso di successo
        })
        .catch(error => {
          // Si è verificato un errore durante la richiesta
          console.log(error);
          // Esegui le azioni necessarie in caso di errore
        });
    }
  },
};
</script>

<style>
#dashboard {
  margin: 0 auto;
  width: 90%;
  height: 100vh;
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

/* form {
  display: flex;
  flex-direction: column;
  align-items: center;
}*/

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
