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
                  <input class="form-control" type="text" id="numeroCommessa" v-model="filters.numeroCommessa" />
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
                  <input class="form-control" type="text" id="idIntervento" v-model="filters.idIntervento" />
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
                  <select class="form-select" id="trimestre" v-model="filters.trimestre">
                    <option v-for="trim in trimestri" [value]="{{ trim.code }}">{{ trim.value }}</option>
                  </select>
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
                  <select class="form-select" id="trimestre" v-model="filters.team">
                    <option v-for="trim in comboTeam" :value="trim.numeroTeam">{{ trim.nomeTeam }}</option>
                  </select>
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
                  <select class="form-select" id="trimestre" v-model="filters.nucleo">
                    <option v-for="nuc in comboNuclei" :value="nuc.numeroNucleo">{{ nuc.nomeNucleo }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="operatore">Operatore</label>
                </div>
              </div>
              <div class="col-md-12">
                <select class="form-select" id="trimestre" v-model="filters.operatore">
                  <option v-for="op in comboOperatori" :value="op.numeroOperatore">{{ op.nomeOperatore }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="statoIntervento">Stato Intervento</label>
                </div>
              </div>
              <div class="col-md-12">
                <select class="form-select" id="trimestre" v-model="filters.statoIntervento">
                  <option v-for="state in comboStatiInterventi" :value="state.value">{{ state.label }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button type="submit" @click="cercaInterventi(filters)">Cerca</button>
        </div>
      </div>
    </form>
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
    </div>
  </div>
</template>
<!--<Footer></Footer>-->

<script>
import mongoose from "mongoose";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      projects: [],
      comboTrimestri: [],
      comboNuclei: [],
      comboTeam: [],
      comboOperatori: [],
      comboStatiInterventi: [],
      filters: {
        numeroCommessa: "",
        idIntervento: "",
        trimestre: "",
        team: "",
        nucleo: "",
        operatore: "",
        statoIntervento: ""
      },
      viewSearch: false
    };
  },
  mounted() {
    // Get the list of projects from the database
    // this.getProjects();
    this.getComboTeams();
    //this.getComboNucleo();
    //this.getComboOperatori();
    //this.getComboStatiInterventi();
  },
  methods: {
    cercaInterventi(filters) {
      const {
        numeroCommessa,
        idIntervento,
        trimestre,
        team,
        nucleo,
        operatore,
        statoIntervento,
      } = filters;

      axios.get("http://localhost:3000/project", {
        params: {
          filters
        }
      }).then(response => {
          console.log('Risposta GET:', response.data);
          this.viewSearch = true;
          this.projects = response.data;
          // Esegui le azioni necessarie con i dati ottenuti dalla risposta
        })
        .catch(error => {
          console.log('Errore GET:', error);
          // Esegui le azioni necessarie in caso di errore
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
      axios.post('http://127.0.0.1:3000/project/' + id, projectOptions)
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
    },
    getComboTeams() {
      axios.get("http://127.0.0.1:3000/team")
        .then(response => {
          console.log('Risposta GET:', response.data);
          if (response.data.length > 0) {
            this.comboTeam = response.data;
          }
          // this.comboTeam = response.data;
        })
        .catch(error => {
          console.log('Errore GET:', error);
        })
    },
    getComboNucleo() {
      axios.get("http://127.0.0.1:3000/nucleo")
        .then(response => {
          console.log('Risposta GET:', response.data);
          if (response.data.length > 0) {
            this.comboNuclei = response.data;
          }
          // this.comboNuclei = response.data;
        })
        .catch(error => {
          console.log('Errore GET:', error);
        })
    },
    getComboOperatori() {
      axios.get("http://127.0.0.1:3000/operatore")
        .then(response => {
          console.log('Risposta GET:', response.data);
          if (response.data.length > 0) {
            this.comboOperatori = response.data;
          }
          // this.comboOperatori = response.data;
        })
        .catch(error => {
          console.log('Errore GET:', error);
        })
    },
    getComboStatiInterventi() {
      this.comboStatiInterventi = [
        { value: "In attesa", label: "In attesa" },
        { value: "In lavorazione", label: "In lavorazione" },
        { value: "Confermato", label: "Confermato" },
        { value: "Concluso", label: "Concluso" }
      ];
    }
  }
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
