<template>
  <div class="dashboard">
    <form>
      <div class="row">
        <div class="col-sm-12">
          <h4>Ricerca Progetti</h4>
          <hr class="mr-5">
        </div>
      </div>
      <div class="card mt-3 mb-3 p-3 mr-5">
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
      <div class="card mr-5" style="min-height: 210px;">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12">
              <button type="button" class="icon-button" @click="showModal(false)">
                <i class="mdi mdi-plus"></i>
              </button>
            </div>
          </div>
          <div class="row m-auto p-5 text-center" v-if="loading">
            <div class="col-sm-12">
              <i class="mdi mdi-loading mdi-spin mdi-48px"></i>
            </div>
          </div>
          <div class="row m-auto p-5 text-center" v-if="!loading && (projects && projects.length <= 0)">
            <div class="col-sm-12">
              <p>Nessun progetto trovato o nessuna ricerca effettuata</p>
            </div>
          </div>
          <table class="table table-hover text-center" v-if="!loading && (projects && projects.length > 0)">
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
                  <div class="row">
                    <div class="col-sm-12">
                      <button class="icon-button"
                        v-bind:disabled="(progetto.statoIntervento !== 'Pianificato' && progetto.statoIntervento !== 'In lavorazione')"
                        @click="showModal(true, progetto)">
                        <i class="mdi mdi-pencil"></i>
                      </button>
                      <button class="icon-button"
                        v-bind:disabled="(progetto.statoIntervento !== 'Pianificato' && progetto.statoIntervento !== 'In lavorazione')"
                        @click="deleteProject(progetto.idIntervento)">
                        <i class="mdi mdi-delete"></i>
                      </button>
                    </div>
                  </div>

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
                  <input type="checkbox"
                    v-bind:disabled="(progetto.giorniRapportini && progetto.percentualeAvanzamento) || (progetto.statoIntervento !== 'Pianificato' && progetto.statoIntervento !== 'In lavorazione')"
                    v-model="progetto.inLavorazione" @change="updateLavorazione(progetto)" />
                </td>
                <td>{{ progetto.giorniRapportini }}</td>
                <td>{{ progetto.percentualeAvanzamento }}</td>
                <td>
                  <div>
                    <button class="icon-button">
                      <i class="mdi mdi-note-outline" @click="insertUpdateRappotino(progetto)"></i>
                    </button>
                    <button class="icon-button" @click="closeProject(progetto)">
                      <i class="mdi mdi-close"></i>
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
  <ModalProject v-show="isCloseRapportiniModal" @close="closeRapportiniModal()">
    <template v-slot:header>
      Rapportini di Sviluppo {{ modalRapportiniProject?.idIntervento }} - {{ modalRapportiniProject?.descrIntervento }}
    </template>
    <template v-slot:body>
      <div class="row">
        <div class="col-sm-3">
          <div class="sidebar">
            <ul class="nav nav-tabs" role="tablist">
              <li v-for="rapportino in modalRapportiniProject.rapportini" :key="rapportino.id"
                class="nav-item btn-primary">
                <button class="btn btn-primary" >
                  {{ rapportino.idRapportino }} - {{ formatDate(rapportino.dataRapportino) }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-9">
          <div class="tab-content">
            <div>
              <h6>Informazioni</h6>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" data-dismiss="modal"
        @click="closeRapportiniModal()">Annulla</button>
    </template>
  </ModalProject>
  <ModalProject v-show="isCloseProjectModal" @close="closeProjectModal">
    <template v-slot:header>
      Chiudi progetto
    </template>
    <template v-slot:body>
      <p>Seleziona lo stato di chiusura</p>
      <select class="form-control" id="statoIntervento" v-model="reasonState">
        <option value="" disabled selected>Stato intervento</option>
        <option v-for="state in comboStatiChiusura" :value="state.value">{{ state.label }}</option>
      </select>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeProjectModal()">Annulla</button>
      <button type="button" class="btn btn-primary" @click="updateStatoChiusuraIntervento()">Chiudi progetto</button>
    </template>
  </ModalProject>
  <ModalProject v-show="isModalVisible" @close="closeModalInsert">
    <template v-slot:header>Nuovo progetto</template>

    <template v-slot:body>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="N. Commessa" id="commessa" v-model="modal.commessa" />
      </div>
      <!--<div class="form-group">
        <input type="text" class="form-control" placeholder="Project name" id="projectName" v-model="modal.commessa"/>
      </div>-->
      <!--<div class="form-group">
        <textarea class="form-control" id="projectDescription" placeholder="Project description"></textarea>
      </div>-->
      <div class="form-group">
        <div class="row">
          <div class="col-sm-3">
            <input type="text" class="form-control" placeholder="Stima" id="stima" v-model="modal.stima" />
          </div>
          <div class="col-sm-3">
            <input type="text" class="form-control" placeholder="Effort" id="effort" v-model="modal.effort" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-md-3 mt-2">
            <select class="form-control" id="trimestre" v-model="modal.trimestre">
              <option value="" disabled selected>Trimestre</option>
              <option v-for="trim in comboTrimestri" :value="trim.value">{{ trim.label }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-md-3 mt-2">
            <select class="form-control" id="operatore" v-model="modal.operatore">
              <option value="" disabled selected>Operatore</option>
              <option v-for="op in comboOperatori" :value="op.id">{{ op.nome }} {{ op.cognome }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-sm-3">
            <!--<input type="text" class="form-control" placeholder="Data inizio" id="dataInizio"
              v-model="modal.dataInizio" />-->
          </div>
          <div class="col-sm-3">
            <!--<input type="text" class="form-control" placeholder="Data fine" id="dataFine" v-model="modal.dataFine" />-->
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="documents">Documents</label>
        <!--<document-manager></document-manager>-->
      </div>
    </template>

    <template v-slot:footer>
      <button @click="editProject()">Update Project</button>
    </template>
  </ModalProject>
</template>

<script>
import axios from "axios";
import moment from "moment";
import DocumentManager from "./DocumentManager.vue";
import ModalProject from "../shared/modalProject.vue";
import { toRaw } from 'vue';

export default {
  name: "Dashboard",
  components: {
    ModalProject,
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
      isCloseProjectModal: false,
      isUpdateMode: false,
      updateIdIntervento: "",
      modal: {
        commessa: "",
        stima: "",
        effort: "",
        trimestre: "",
        operatore: "",
        // dataInizio: "",
        // dataFine: ""
      },
      updateProject: {},
      closedProject: null,
      reasonState: "",
      isCloseRapportiniModal: false,
      modalRapportiniProject: {},
      tab: 'option-1'
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
    editProject() {
      this.isModalVisible = false;
      if (this.updateProject) {
        // update project
        const ope = this.comboOperatori.find(op => op.id === this.modal.operatore);
        return axios.post(`http://127.0.0.1:3000/project`, {
          idIntervento: this.updateProject.idIntervento,
          trimestre: this.modal.trimestre,
          operatore: {
            nome: ope.nome,
            cognome: ope.cognome,
            email: ope.email,
            username: ope.username,
            password: ope.password,
            admin: ope.admin,
            manager: ope.manager,
          },
          stima: this.modal.stima,
          effort: this.modal.effort,
          commessa: {
            numeroCommessa: "1",
            nomeCommessa: this.modal.commessa
          }
        }).then(response => {
          console.log('response: ', response.data.updateProject);
          this.model = {
            commessa: "",
            stima: "",
            effort: "",
            trimestre: "",
            operatore: "",
            // dataInizio: "",
            // dataFine: ""
          }
          this.updateProject = null;
          this.cercaInterventi(this.filters);
        }).catch(error => {
          // Si è verificato un errore durante la richiesta
          console.log(error);
          // Esegui le azioni necessarie in caso di errore
        });
      } else {
        // insert project
        const ope = this.comboOperatori.find(op => op.id === this.modal.operatore);
        return axios.put(`http://127.0.0.1:3000/project`, {
          idIntervento: "I002",
          trimestre: this.modal.trimestre,
          operatore: {
            nome: ope.nome,
            cognome: ope.cognome,
            email: ope.email,
            username: ope.username,
            password: ope.password,
            admin: ope.admin,
            manager: ope.manager,
          },
          stima: this.modal.stima,
          effort: this.modal.effort,
          commessa: {
            numeroCommessa: "1",
            nomeCommessa: this.modal.commessa
          },
          statoIntervento: "Pianificato",
          inLavorazione: false,
          // dataInizio: this.modal.dataInizio,
          // dataFine: this.modal.dataFine
        }).then(response => {
          // console.log('response: ', response.data.projects);
          this.model = {
            commessa: "",
            stima: "",
            effort: "",
            trimestre: "",
            operatore: "",
            // dataInizio: "",
            // dataFine: ""
          }
          this.updateProject = null;
          this.cercaInterventi(this.filters);
        }).catch(error => {
          // Si è verificato un errore durante la richiesta
          console.log(error);
          // Esegui le azioni necessarie in caso di errore
        });
      }
    },
    deleteProject(idIntervento) {
      event.preventDefault();
      // const deleteProject = toRaw(progetto);
      return axios.post(`http://127.0.0.1:3000/project/delete_project`, {
        idIntervento
      }).then(response => {
        console.log('response: ', response.data.deletedProject);
        this.cercaInterventi(this.filters);
      })
    },
    showModal(modifica, progetto) {
      this.isModalVisible = true;
      this.isUpdateMode = modifica;
      if (progetto) {
        this.updateProject = toRaw(progetto);
        this.modal = {
          commessa: this.updateProject.commessa.nomeCommessa,
          stima: this.updateProject.stima,
          effort: this.updateProject.effort,
          trimestre: this.updateProject.trimestre,
          operatore: this.updateProject.operatore.id,
        }
      }
    },
    closeProjectModal() {
      this.isCloseProjectModal = false;
    },
    closeProject(progetto) {
      this.isCloseProjectModal = true;
      this.getComboStatiChiusura();
      this.closedProject = toRaw(progetto);
    },
    closeModalInsert() {
      console.log('here');
      this.isModalVisible = false;
    },
    closeRapportiniModal() {
      this.isCloseRapportiniModal = false;
    },
    insertUpdateRappotino(progetto) {
      this.isCloseRapportiniModal = true;
      this.modalRapportiniProject = toRaw(progetto);
    },
    showReportInfo(projectSelected) {

    },
    salvaRapportino() {
      event.preventDefault();
      this.isCloseRapportiniModal = false;
      this.loading = true;
      return axios.post(`http://127.0.0.1:3000/project/salva_rapportino`, {

      })
    },
    updateStatoChiusuraIntervento() {
      event.preventDefault();
      this.loading = true;
      return axios.post(`http://127.0.0.1:3000/project/chiudere_intervento`, {
        statoIntervento: this.reasonState,
        idIntervento: this.closedProject.idIntervento
      }).then(response => {
        console.log('response: ', response.data.projects);
        setTimeout(() => {
          const index = this.projects.indexOf(progetto);
          this.projects[index].statoIntervento = statoIntervento;
          // this.projects = response.data.projects;
          window.onbeforeunload = null;
          this.closeProjectModal();
          this.cercaInterventi(this.filters);
        }, 3000);
      })
    },
    updateLavorazione(progetto) {
      event.preventDefault();
      this.loading = true;
      const rawProgetto = toRaw(progetto);
      const statoIntervento = (rawProgetto.inLavorazione) ? "In Lavorazione" : "Pianificato";

      return axios.post(`http://127.0.0.1:3000/project/update_lavorazione`, {
        inLavorazione: rawProgetto.inLavorazione,
        idIntervento: rawProgetto.idIntervento,
        statoIntervento: statoIntervento
      })
        .then(response => {
          console.log('response: ', response.data.projects);
          setTimeout(() => {
            this.loading = false;
            const index = this.projects.indexOf(progetto);
            this.projects[index].statoIntervento = statoIntervento;
            // this.projects = response.data.projects;
            window.onbeforeunload = null;
          }, 3000);

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
    getComboStatiChiusura() {
      this.comboStatiChiusura = [
        { value: "Chiuso", label: "Chiuso" },
        { value: "Completato", label: "Completato" },
        { value: "Da testare", label: "Da testare" }
      ]
    },
    getComboStatiInterventi() {
      this.comboStatiInterventi = [
        { value: "Chiuso", label: "Chiuso" },
        { value: "Completato", label: "Completato" },
        { value: "Da testare", label: "Da testare" },
        { value: "In lavorazione", label: "In lavorazione" },
        { value: "Pianificato", label: "Pianificato" },
      ];
    },
    getComboTrimestri() {
      const currentYear = new Date().getFullYear();
      this.comboTrimestri = [
        { value: "T1", label: '' + currentYear + ' T1' },
        { value: "T2", label: '' + currentYear + ' T2' },
        { value: "T3", label: '' + currentYear + ' T3' },
        { value: "T4", label: '' + currentYear + ' T4' },
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

.sidebar {
  width: 200px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 0 10px;
}
</style>
