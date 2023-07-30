<template>
  <div class="dashboard">
    <form>
      <div class="row">
        <div class="col-sm-12">
          <h4>Ricerca Progetti</h4>
        </div>
      </div>
      <div class="card mt-3 mb-3 p-3">
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
          <div class="col-sm-1 p-0">
            <button type="submit" class="btn btn-primary" @click="cercaInterventi(filters)">Cerca</button>
          </div>
        </div>
      </div>
    </form>
    <div class="content mt-3">
      <div class="card" style="min-height: 210px;">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12">
              <button type="button" class="icon-button" @click="showModalInsert">
                <i class="mdi mdi-plus"></i>
              </button>
            </div>
          </div>
          <div class="row m-auto p-5 text-center" v-if="loading">
            <div class="col-sm-12">
              <i class="mdi mdi-loading mdi-spin mdi-48px"></i>
            </div>
          </div>
          <div class="row m-auto p-5 text-center" v-if="!loading && projects.length <= 0">
            <div class="col-sm-12">
              <p>Nessun progetto trovato</p>
            </div>
          </div>
          <table class="table table-hover text-center" v-if="!loading && projects.length > 0">
            <thead>
              <tr>
                <th scope="col" class="table-header"></th>
                <th scope="col" class="table-header">Commessa</th>
                <th scope="col" class="table-header">ID Intervento</th>
                <th scope="col" class="table-header">Stato</th>
                <th scope="col" class="table-header">Stima</th>
                <th scope="col" class="table-header">Effort</th>
                <th scope="col" class="table-header">Operatore</th>
                <th scope="col" class="table-header">Trimestre</th>
                <th scope="col" class="table-header">Data Inizio</th>
                <th scope="col" class="table-header">Data Fine</th>
                <th scope="col" class="table-header">In Lavorazione</th>
                <th scope="col" class="table-header">GG</th>
                <th scope="col" class="table-header">% Avanzamento</th>
                <th scope="col" class="table-header"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="progetto in projects" :key="progetto.id">
                <td>
                  <button class="icon-button" @click="editProject(progetto.id)">
                    <i class="mdi mdi-pencil"></i>
                  </button>
                </td>
                <td>{{ progetto.commessa.nomeCommessa }}</td>
                <td>{{ progetto.idIntervento }}</td>
                <td>{{ progetto.statoIntervento }}</td>
                <td>{{ progetto.stima }}</td>
                <td>{{ progetto.effort }}</td>
                <td>{{ progetto.operatore.cognome }} {{ progetto.operatore.nome }}</td>
                <td>{{ progetto.trimestre }}</td>
                <td>{{ formatDate(progetto.dataInizio) }}</td>
                <td>{{ formatDate(progetto.dataInizio) }}</td>
                <td>
                  <input type="checkbox" v-model="progetto.inLavorazione"
                  @change="updateLavorazione(progetto)" />
                </td>
                <td>{{ progetto.giorniRapportini }}</td>
                <td>{{ progetto.percentualeAvanzamento }}</td>
                <td>
                  <div>
                    <button class="icon-button" @click="insertProject()">
                      <i class="mdi mdi-note-outline"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--<EditProject v-show="isModalVisible" @close="closeModalInsert">
    <template v-slot:header>Nuovo progetto</template>

    <template v-slot:body>
      <div class="form-group">
        <label for="projectName">Project name</label>
        <input type="text" id="projectName"/>
      </div>
      <div class="form-group">
        <label for="projectDescription">Project description</label>
        <textarea id="projectDescription"></textarea>
      </div>
      <div class="form-group">
        <label for="documents">Documents</label>
        <document-manager></document-manager>
      </div>
    </template>

    <template v-slot:footer>
      <button @click="updateProject">Update Project</button>
    </template>
  </EditProject>-->
</template>

<script>
import axios from "axios";
import moment from "moment";
import EditProject from "./EditProject.vue";
import DocumentManager from "./DocumentManager.vue";
import { toRaw } from 'vue';

export default {
  name: "Dashboard",
  components: {
    EditProject,
    DocumentManager
  },
  data() {
    return {
      projects: [],
      comboTrimestri: [],
      comboNuclei: [],
      comboTeam: [],
      comboOperatori: [],
      comboStatiInterventi: [],
      loading: false,
      filters: {
        numeroCommessa: "",
        idIntervento: "",
        trimestre: "",
        // team: "",
        // nucleo: "",
        operatore: "",
        statoIntervento: ""
      },
      inLavorazione: false,
      isModalVisible: false,
    };
  },
  mounted() {
    this.getComboOperatori();
    this.getComboStatiInterventi();
    this.getComboTrimestri();
  },
  methods: {
    cercaInterventi(filters) {
      this.loading = true;
      this.projects = [];
      event.preventDefault();
      return axios.get("http://localhost:3000/project", { params: filters }).then(response => {
        console.log('Risposta GET:', response.data);
        setTimeout(() => {
          this.loading = false;
          this.projects = response.data.projects;
          window.onbeforeunload = null;
        }, 3000);
      });
    },
    reset() {
      this.filters = {
        numeroCommessa: "",
        idIntervento: "",
        trimestre: "",
        operatore: "",
        statoIntervento: ""
      };
    },
    editProject(id) {

    },
    showModalInsert() {
      this.isModalVisible = true;
    },
    closeModalInsert() {
      console.log('here');
      this.isModalVisible = false;
    },
    updateLavorazione(progetto) {
      event.preventDefault();
      const rawProgetto = toRaw(progetto);

      const updateData = {
        inLavorazione: rawProgetto.inLavorazione
      }
      return axios.post(`http://127.0.0.1:3000/project/${rawProgetto.idIntervento}`, updateData)
        .then(response => {
          console.log('response: ', response);
          
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
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY'); // Esempio: 01/01/2022
    }
  }
};
</script>

<style>
.dashboard {
  margin: 120px 0px 20px 0px;
}

.dashboard,
.content {
  width: 100%;
}

.dashboard form,
.content {
  padding-left: 30px;
  pa: 30px;
}

.dashboard form input {
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
