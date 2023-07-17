<!--<Navbar></Navbar>-->
<template>
  <Navbar></Navbar>
  <div id="dashboard">
    <form>
      <div class="row">
        <div class="col-sm-12">
          <h4>Ricerca Progetti</h4>
        </div>
      </div>
      <div class="card mt-3 mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mt-2">
              <input class="form-control" type="text" id="numeroCommessa" placeholder="Numero Commessa"
                v-model="filters.numeroCommessa" />
            </div>
            <div class="col-md-3 mt-2">
              <input class="form-control" type="text" id="idIntervento" placeholder="ID Intervento"
                v-model="filters.idIntervento" />
            </div>
            <div class="col-md-3 mt-2">
              <select class="form-control" id="trimestre" v-model="filters.trimestre">
                <option value="" disabled selected>Trimestre</option>
                <option v-for="trim in comboTrimestri" :value="trim.value">{{ trim.label }}</option>
              </select>
            </div>
            <div class="col-md-3 mt-2">
              <select class="form-control" id="operatore" v-model="filters.operatore">
                <option value="" disabled selected>Operatore</option>
                <option v-for="op in comboOperatori" :value="op.id">{{ op.nome }} {{ op.cognome }}</option>
              </select>
            </div>
            <div class="col-md-3 mt-2">
              <select class="form-control" id="statoIntervento" v-model="filters.statoIntervento">
                <option value="" disabled selected>Stato intervento</option>
                <option v-for="state in comboStatiInterventi" :value="state.value">{{ state.label }}</option>
              </select>
            </div>
          </div>
          <!--<div class="row">
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="team">Team</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <select class="form-select form-control-sm" id="trimestre" v-model="filters.team">
                    <option v-for="trim in comboTeam" :value="trim.numeroTeam">{{ trim.nomeTeam }}</option>
                  </select>
                </div>
              </div>
            </div>-->
          <!--<div class="col-md-3">
              <div class="row">
                <div class="col-md-12">
                  <label for="nucleo">Nucleo</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <select class="form-select form-control-sm" id="nucleo" v-model="filters.nucleo">
                    <option v-for="nuc in comboNuclei" :value="nuc.numeroNucleo">{{ nuc.nomeNucleo }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>-->
        </div>
        <div class="row">
          <div class="col-sm-11 d-flex justify-content-end">
            <button type="button" class="btn btn-secondary mr-2" @click="reset()">Reset</button>
          </div>
          <div class="col-sm-1">
            <button type="submit" class="btn btn-primary" @click="cercaInterventi(filters)">Cerca</button>
          </div>
        </div>
      </div>
    </form>
    <div class="content mt-3" v-if="projects.length > 0">
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
  <Footer></Footer>
</template>
<!--<Footer></Footer>-->

<script>
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
        // team: "",
        // nucleo: "",
        operatore: "",
        statoIntervento: ""
      },
      // viewSearch: false
    };
  },
  mounted() {
    // Get the list of projects from the database
    // this.getProjects();
    // this.getComboTeams();
    // this.getComboNucleo();
    this.getComboOperatori();
    this.getComboStatiInterventi();
    this.getComboTrimestri()
  },
  methods: {
    async cercaInterventi(filters) {
      const response = await axios.get("http://localhost:3000/project");
      console.log('Risposta GET:', response.data.projects);
      if (response.data.projects.length > 0) {
        this.projects = response.data.projects;
        response.preventDefault()
      } else {
        this.projects = [];
        alert("Nessun progetto trovato");
      }
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
    /*getComboTeams() {
      axios.get("http://127.0.0.1:3000/team")
        .then(response => {
          console.log('Risposta GET:', response.data.teams);
          if (response.data.teams.length > 0) {
            this.comboTeam = response.data.teams;
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
          console.log('Risposta GET:', response.data.nuclei);
          if (response.data.nuclei.length > 0) {
            this.comboNuclei = response.data.nuclei;
          }
          // this.comboNuclei = response.data;
        })
        .catch(error => {
          console.log('Errore GET:', error);
        })
    },*/
    async getComboOperatori() {
      const response = await axios.get("http://127.0.0.1:3000/operatore")
      // console.log('Risposta GET:', response.data.operatore);
      if (response.data.operatore.length > 0) {
        const ope = response.data.operatore.filter(item => !item.admin);
        this.comboOperatori = ope;
      } else {
        this.comboOperatori = [];
        alert("Nessun progetto trovato");
      }
    },
    getComboStatiInterventi() {
      this.comboStatiInterventi = [
        { value: "In attesa", label: "In attesa" },
        { value: "In lavorazione", label: "In lavorazione" },
        { value: "Confermato", label: "Confermato" },
        { value: "Concluso", label: "Concluso" }
      ];
    },
    getComboTrimestri() {
      const currentYear = new Date().getFullYear();
      this.comboTrimestri = [
        { value: "1", label: '' + currentYear + ' 1T' },
        { value: "2", label: '' + currentYear + ' 2T' },
        { value: "3", label: '' + currentYear + ' 3T' },
        { value: "4", label: '' + currentYear + ' 4T' },
      ]
    }
  }
};
</script>

<style>
.dashboard {
  margin: 0 auto;
  width: 1000px;
}

.navbar {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
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

.dashboard form {
  margin: 0 0 20px 0;
}

.dashboard form input {
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  color: #ccc;
}

.dashboard form input[type="submit"] {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #000;
  padding: 10px 20px;
}

.dashboard form input[type="submit"]:hover {
  background-color: #ccc;
  color: #fff;
}

.dashboard .results {
  margin: 0 0 20px 0;
}

.dashboard .results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dashboard .results li {
  border: 1px solid #ccc;
  margin: 10px 0;
}

.dashboard .results li a {
  color: #000;
  text-decoration: none;
}

.dashboard .results li a:hover {
  color: #fff;
  background-color: #ccc;
}
</style>
