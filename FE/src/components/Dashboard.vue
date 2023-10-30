<template>
  <div class="dashboard">
    <form>
      <div class="row">
        <div class="col-sm-12">
          <h4>Ricerca Progetti</h4>
          <hr class="mr-5" />
        </div>
      </div>
      <div class="card light-sky mt-3 mb-3 p-3 mr-5">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mt-2">
              <!--<input class="form-control" type="text" id="numeroCommessa" placeholder="Numero Commessa"
                v-model="filters.numeroCommessa" />-->
              <select class="form-control" id="commessa" v-model="filters.commessa">
                <option value="" disabled selected>Commessa</option>
                <option v-for="comm in comboCommessa" :value="comm._id">
                  {{ comm.nomeCommessa }}
                </option>
              </select>
            </div>
            <div class="col-md-3 mt-2">
              <input class="form-control" type="text" id="idIntervento" placeholder="ID Intervento"
                v-model="filters.idIntervento" />
            </div>
            <div class="col-md-3 mt-2">
              <select class="form-control" id="trimestre" v-model="filters.trimestre">
                <option value="" disabled selected>Trimestre</option>
                <option v-for="trim in comboTrimestri" :value="trim.value">
                  {{ trim.label }}
                </option>
              </select>
            </div>
            <div class="col-md-3 mt-2">
              <select class="form-control" id="operatore" v-model="filters.operatore">
                <option value="" disabled selected>Operatore</option>
                <option v-for="op in comboOperatori" :value="op.id">
                  {{ op.nome }} {{ op.cognome }}
                </option>
              </select>
            </div>
            <div class="col-md-3 mt-2">
              <select class="form-control" id="statoIntervento" v-model="filters.statoIntervento">
                <option value="" disabled selected>Stato intervento</option>
                <option v-for="state in comboStatiInterventi" :value="state.value">
                  {{ state.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-11 d-flex justify-content-end">
            <v-btn class="btn btn-secondary mr-2" @click="reset()">
              Reset
            </v-btn>
          </div>
          <div class="col-sm-1 p-0">
            <v-btn class="btn btn-primary" @click="cercaInterventi(filters)">
              Cerca
            </v-btn>
          </div>
        </div>
      </div>
    </form>
    <div class="content mt-3">
      <div class="card mr-5" style="min-height: 210px">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12">

              <v-btn class="icon-button">
                <i class="mdi mdi-plus"></i>
                <v-dialog v-model="insertDialog" activator="parent" width="1024">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Nuovo Intervento</span>
                    </v-card-title>
                    <v-card-body>
                      <div class="form-group m-4">
                        <input type="text" class="form-control" placeholder="Nome Intervento" id="intervento"
                          v-model="modalInsert.descrIntervento" :disabled="isDisabled" />
                      </div>
                      <div class="form-group m-4">
                        <!--<input type="text" class="form-control" placeholder="N. Commessa" id="commessa"
                          v-model="modalInsert.commessa" :disabled="isDisabled" />-->
                        <select class="form-control" id="commessa" v-model="modalInsert.commessa" placeholder="Commessa">
                          <option value="" disabled selected>Commessa</option>
                          <option v-for="comm in comboCommessa" :value="comm._id">
                            {{ comm.nomeCommessa }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group m-4">
                        <div class="row">
                          <div class="col-sm-3">
                            <input type="number" class="form-control" placeholder="Stima" id="stima"
                              v-model="modalInsert.stima" :disabled="isDisabled" />
                          </div>
                          <div class="col-sm-3">
                            <input type="number" class="form-control" placeholder="Effort" id="effort"
                              v-model="modalInsert.effort" :disabled="isDisabled" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group m-4">
                        <div class="row">
                          <div class="col-md-3">
                            <select class="form-control" id="trimestre" v-model="modalInsert.trimestre"
                              :disabled="isDisabled" placeholder="Trimestre">
                              <option value="" disabled selected>Trimestre</option>
                              <option v-for="trim in comboTrimestri" :value="trim.value">
                                {{ trim.label }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="form-group m-4">
                        <div class="row">
                          <div class="col-md-3">
                            <select class="form-control" id="operatore" v-model="modalInsert.operatore"
                              placeholder="Operatore" :disabled="isDisabled">
                              <option value="" disabled selected>Operatore</option>
                              <option v-for="op in comboOperatori" :value="op._id">
                                {{ op.nome }} {{ op.cognome }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="form-group m-4">
                        <div class="row" style="vertical-align: middle;">
                          <div class="col-md-4">
                            <label>Data inizio</label>
                            <input type="date" class="form-control" v-model="modalInsert.dataInizio"
                              placeholder="Data inizio">
                          </div>
                        </div>
                      </div>
                      <div class="form-group m-4">
                        <div class="row" style="vertical-align: middle;">
                          <div class="col-md-4">
                            <label>Data fine</label>
                            <input type="date" class="form-control" v-model="modalInsert.dataFine"
                              placeholder="Data fine">
                          </div>
                        </div>
                      </div>
                      <!--<div class="form-group m-4">
                        <label for="documents">Documents </label>
                      </div>-->
                    </v-card-body>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue-darken-1" variant="text" @click="insertDialog = false">
                        Annulla
                      </v-btn>
                      <v-btn color="blue-darken-1" variant="text" 
                      :disabled="modalInsert.descrIntervento == '' || modalInsert.commessa == '' || modalInsert.trimestre == '' || modalInsert.operatore == '' || modalInsert.dataInizio == '' || modalInsert.dataFine == ''"
                      @click="editInsertProject(false)">
                        Salva
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
            </div>
          </div>
          <div class="row m-auto p-5 text-center" v-if="loading">
            <div class="col-sm-12">
              <i class="mdi mdi-loading mdi-spin mdi-48px"></i>
            </div>
          </div>
          <div class="row m-auto p-5 text-center" v-if="!loading && projects && projects.length <= 0">
            <div class="col-sm-12">
              <p>Nessun progetto trovato o nessuna ricerca effettuata</p>
            </div>
          </div>
          <table class="table table-hover text-center" v-if="!loading && projects && projects.length > 0">
            <thead>
              <tr>
                <th scope="col" class="table-header"></th>
                <th scope="col" class="table-header">Commessa</th>
                <th scope="col" class="table-header">ID Intervento</th>
                <th scope="col" class="table-header">Stato</th>
                <th scope="col" class="table-header">Stima (gg)</th>
                <th scope="col" class="table-header">Effort (gg)</th>
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
              <tr v-for="progetto in projects" :key="progetto.id" style="vertical-align: middle;">
                <td>
                  <div class="row">
                    <div class="col-sm-12">
                      <!-- modifica intervento -->
                      <v-btn class="icon-button mr-2" @click="getProject(progetto)">
                        <i class="mdi mdi-pencil"></i>
                        <v-dialog v-model="dialogEdit" activator="parent" width="1024">
                          <v-card>
                            <v-card-title>
                              <span class="headline">Modifica Intervento n. {{ modalEdit.idIntervento }}</span>
                            </v-card-title>
                            <v-card-body>
                              <div class="form-group m-4">
                                <input type="text" class="form-control" placeholder="Nome Intervento" id="intervento"
                                  v-model="modalEdit.descrIntervento"
                                  :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))" />
                              </div>
                              <div class="form-group m-4">
                                <select class="form-control" id="commessa" v-model="modalEdit.commessa"
                                  placeholder="Commessa"
                                  :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))">
                                  <option value="" disabled selected>Commessa</option>
                                  <option v-for="comm in comboCommessa" :value="comm._id">
                                    {{ comm.nomeCommessa }}
                                  </option>
                                </select>
                              </div>
                              <div class="form-group m-4">
                                <div class="row">
                                  <div class="col-sm-3">
                                    <input type="number" class="form-control" placeholder="Stima" id="stima"
                                      v-model="modalEdit.stima"
                                      :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))" />
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="number" class="form-control" placeholder="Effort" id="effort"
                                      v-model="modalEdit.effort"
                                      :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))" />
                                  </div>
                                </div>
                              </div>
                              <div class="form-group m-4">
                                <div class="row">
                                  <div class="col-md-3">
                                    <select class="form-control" id="trimestre" v-model="modalEdit.trimestre"
                                      :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))"
                                      placeholder="Trimestre">
                                      <option value="" disabled selected>Trimestre</option>
                                      <option v-for="trim in comboTrimestri" :value="trim.value">
                                        {{ trim.label }}
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div class="form-group m-4">
                                <div class="row">
                                  <div class="col-md-3">
                                    <select class="form-control" id="operatore" v-model="modalEdit.operatore"
                                      placeholder="Operatore"
                                      :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))">
                                      <option value="" disabled selected>Operatore</option>
                                      <option v-for="op in comboOperatori" :value="op._id">
                                        {{ op.nome }} {{ op.cognome }}
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div class="form-group m-4">
                                <div class="row" style="vertical-align: middle;">
                                  <div class="col-md-4">
                                    <label>Data inizio</label>
                                    <input type="date" class="form-control" v-model="modalEdit.dataInizio"
                                      :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))"
                                      placeholder="Data inizio">
                                  </div>
                                </div>
                              </div>
                              <div class="form-group m-4">
                                <div class="row" style="vertical-align: middle;">
                                  <div class="col-md-4">
                                    <label>Data fine</label>
                                    <input type="date" class="form-control" v-model="modalEdit.dataFine"
                                      :disabled="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))"
                                      placeholder="Data fine">
                                  </div>
                                </div>
                              </div>
                            </v-card-body>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue-darken-1" variant="text"
                                v-if="((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))"
                                @click="dialogEdit = false">
                                Chiudi
                              </v-btn>
                              <v-btn color="blue-darken-1" variant="text"
                                v-if="!((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))"
                                @click="dialogEdit = false">
                                Annulla
                              </v-btn>
                              <v-btn color="blue-darken-1" variant="text"
                                :disabled="modalEdit.descrIntervento === '' || modalEdit.effort === '' || modalEdit.stima === '' || modalEdit.trimestre === '' || modalEdit.operatore === '' || modalEdit.dataInizio === '' || modalEdit.dataFine === ''"
                                v-if="!((progetto.giorniDiAvanzamento > 0) && (progetto.percentualeAvanzamento > 0))"
                                @click="editInsertProject(true)">
                                Salva
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-btn>

                      <!-- elimina progetto -->
                      <v-btn class="icon-button" @click="openDeleteProject(progetto)">
                        <i class="mdi mdi-delete"></i>
                        <v-dialog v-model="deleteProjectDialog" activator="parent" width="500">
                          <v-card>
                            <v-card-title>
                              <span class="headline">Elimina progetto</span>
                            </v-card-title>
                            <v-card-body>
                              <div class="form-group m-4">
                                <div class="row">
                                  <div class="col-md-12">
                                    <p>Sicuro di voler cancellare il progetto?</p>
                                  </div>
                                </div>
                              </div>
                            </v-card-body>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue-darken-1" variant="text" @click="deleteProjectDialog = false">
                                Annulla
                              </v-btn>
                              <v-btn color="blue-darken-1" variant="text" @click="deleteProject(deletedProject._id)">
                                Conferma
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-btn>
                    </div>
                  </div>
                </td>
                <td>{{ progetto.commessa ? progetto.commessa.nomeCommessa : '-' }}</td>
                <td>{{ progetto._id.substring(0, 10) }}</td>
                <td>{{ progetto.statoIntervento }}</td>
                <td>{{ progetto.stima }}</td>
                <td>{{ progetto.effort }}</td>
                <td>{{ progetto.operatore.cognome }} {{ progetto.operatore.nome }}</td>
                <td>{{ progetto.trimestre }}</td>
                <td>{{ formatDate(progetto.dataInizio) }}</td>
                <td>{{ formatDate(progetto.dataFine) }}</td>
                <td>
                  <input type="checkbox"
                    v-bind:disabled="(progetto.giorniDiAvanzamento && progetto.percentualeAvanzamento)"
                    v-model="progetto.inLavorazione" @change="updateLavorazione(progetto)" />
                </td>
                <td>{{ progetto.giorniDiAvanzamento > 0 ? progetto.giorniDiAvanzamento : '' }}</td>
                <td>{{ progetto.percentualeAvanzamento > 0 ? progetto.percentualeAvanzamento + '%' : '' }}</td>
                <td>
                  <div>
                    <v-btn class="icon-button mr-2" @click="insertUpdateRapportino(progetto)">
                      <i class="mdi mdi-note-outline"></i>
                    </v-btn>
                    <v-btn class="icon-button" @click="closeProject(progetto)">
                      <i class="mdi mdi-close"></i>
                      <v-dialog v-model="closeProjectDialog" activator="parent" width="500">
                        <v-card>
                          <v-card-title>
                            <span class="headline">Chiudi progetto</span>
                          </v-card-title>
                          <v-card-body>
                            <div class="form-group m-4">
                              <div class="row">
                                <div class="col-md-6">
                                  <p>Seleziona lo stato di chiusura</p>
                                </div>
                              </div>
                            </div>
                            <div class="form-group m-4">
                              <div class="row">
                                <div class="col-md-6">
                                  <select class="form-control" id="statoIntervento" v-model="reasonState">
                                    <option value="" disabled selected>Stato intervento</option>
                                    <option v-for="state in comboStatiChiusura" :value="state.value">
                                      {{ state.label }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </v-card-body>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeProjectDialog = false">
                              Annulla
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" 
                             :disabled="reasonState === ''"
                            @click="updateStatoChiusuraIntervento()">
                              Conferma
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
// import DocumentManager from "./DocumentManager.vue";
import { toRaw } from "vue";

export default {
  name: "Dashboard",
  data() {
    return {
      projects: [],
      comboTrimestri: [],
      comboCommessa: [],
      comboNuclei: [],
      comboTeam: [],
      comboOperatori: [],
      comboStatiInterventi: [],
      loading: false,
      filters: {
        commessa: "",
        idIntervento: "",
        trimestre: this.getCurrentTrimestre(),
        // team: "",
        // nucleo: "",
        operatore: "",
        statoIntervento: "",
      },
      modalInsert: {
        commessa: "",
        descrIntervento: "",
        stima: null,
        effort: null,
        trimestre: this.getCurrentTrimestre(),
        operatore: "",
        dataInizio: "",
        dataFine: ""
      },
      modalEdit: {
        id: "",
        progessivo: "",
        idIntervento: null,
        descrIntervento: "",
        commessa: "",
        stima: null,
        effort: null,
        trimestre: null,
        operatore: "",
        dataInizio: "",
        dataFine: ""
      },
      inLavorazione: false,
      updateIdIntervento: "",
      updateProject: {},
      closedProject: null,
      reasonState: "",
      isDisabled: false,
      insertDialog: false,
      dialogEdit: false,
      closeProjectDialog: false,
      deleteProjectDialog: false,
      deletedProject: {}
    };
  },
  mounted() {
    this.getComboCommessa();
    this.getComboOperatori();
    this.getComboStatiInterventi();
    this.getComboTrimestri();
  },
  methods: {
    cercaInterventi(filters) {
      this.loading = true;
      this.projects = [];
      event.preventDefault();
      return axios
        .get("http://localhost:3000/project", { params: filters })
        .then((response) => {
          console.log("Risposta GET:", response.data);
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
        statoIntervento: "",
      };
    },
    editInsertProject(edit) {
      if (edit) {
        // update project
        this.dialogEdit = false;
        return axios
          .post(`http://127.0.0.1:3000/project`, {
            progettoDaModificare: {
              id: this.modalEdit.id,
              idIntervento: this.modalEdit.id,
              progressivo: this.modalEdit.progressivo,
              descrIntervento: this.modalEdit.descrIntervento,
              trimestre: this.modalEdit.trimestre,
              operatore: this.modalEdit.operatore,
              stima: this.modalEdit.stima,
              effort: this.modalEdit.effort,
              commessa: this.modalEdit.commessa,
              dataInizio: new Date(this.modalEdit.dataInizio),
              dataFine: new Date(this.modalEdit.dataFine),
            }
          })
          .then((response) => {
            console.log("response: ", response.data.updateProject);
            this.modalEdit = {
              id: "",
              progessivo: "",
              idIntervento: null,
              descrIntervento: "",
              commessa: "",
              stima: null,
              effort: null,
              trimestre: null,
              operatore: "",
              dataInizio: "",
              dataFine: ""
            }
            this.updateProject = null;
            this.cercaInterventi(this.filters);
          })
          .catch((error) => {
            // Si è verificato un errore durante la richiesta
            console.log(error);
            // Esegui le azioni necessarie in caso di errore
          });
      } else {
        // insert project
        this.insertDialog = false;
        return axios
          .put(`http://127.0.0.1:3000/project`, {
            descrIntervento: this.modalInsert.descrIntervento,
            trimestre: this.modalInsert.trimestre,
            operatore: this.modalInsert.operatore,
            stima: this.modalInsert.stima,
            effort: this.modalInsert.effort,
            commessa: this.modalInsert.commessa,
            statoIntervento: "Pianificato",
            inLavorazione: false,
            dataInizio: new Date(this.modalInsert.dataInizio),
            dataFine: new Date(this.modalInsert.dataFine),
          })
          .then((response) => {
            // console.log('response: ', response.data.projects);
            this.modalInsert = {
              commessa: "",
              stima: "",
              effort: "",
              trimestre: "",
              operatore: ""
            };
            this.updateProject = null;
            this.cercaInterventi(this.filters);
          })
          .catch((error) => {
            // Si è verificato un errore durante la richiesta
            console.log(error);
            // Esegui le azioni necessarie in caso di errore
          });
      }
    },
    openDeleteProject(progetto) {
      this.deletedProject = toRaw(progetto);
    },
    deleteProject(id) {
      this.deleteProjectDialog = false;
      event.preventDefault();
      return axios
        .post(`http://127.0.0.1:3000/project/delete_project`, {
          id,
        })
        .then((response) => {
          console.log("response: ", response.data.deletedProject);
          this.cercaInterventi(this.filters);
        });
    },
    getProject(progetto) {

      this.modalEdit = {
        id: progetto._id,
        progressivo: progetto.progessivo,
        idIntervento: progetto._id.substring(0, 10),
        descrIntervento: progetto.descrIntervento,
        commessa: progetto.commessa._id,
        operatore: progetto.operatore._id,
        effort: progetto.effort,
        stima: progetto.stima,
        trimestre: progetto.trimestre, 
        dataInizio: moment(new Date(progetto.dataInizio)).format("YYYY-MM-DD"),
        dataFine: moment(new Date(progetto.dataFine)).format("YYYY-MM-DD")
      };
    },
    closeProject(progetto) {
      this.getComboStatiChiusura();
      this.closedProject = toRaw(progetto);
    },
    updateStatoChiusuraIntervento() {
      event.preventDefault();
      this.loading = true;
      return axios
        .post(`http://127.0.0.1:3000/project/chiudere_intervento`, {
          statoIntervento: this.reasonState,
          idIntervento: this.closedProject.idIntervento,
        })
        .then((response) => {
          console.log("response: ", response.data.projects);
          setTimeout(() => {
            const index = this.projects.indexOf(progetto);
            this.projects[index].statoIntervento = statoIntervento;
            // this.projects = response.data.projects;
            window.onbeforeunload = null;
            this.closeProjectModal();
            this.cercaInterventi(this.filters);
          }, 3000);
        });
    },
    updateLavorazione(progetto) {
      event.preventDefault();
      this.loading = true;
      const rawProgetto = toRaw(progetto);
      const statoIntervento = rawProgetto.inLavorazione
        ? "In Lavorazione"
        : "Pianificato";

      return axios
        .post(`http://127.0.0.1:3000/project/update_lavorazione`, {
          inLavorazione: rawProgetto.inLavorazione,
          idIntervento: rawProgetto.idIntervento,
          statoIntervento: statoIntervento,
        })
        .then((response) => {
          console.log("response: ", response.data.projects);
          setTimeout(() => {
            this.loading = false;
            const index = this.projects.indexOf(progetto);
            this.projects[index].statoIntervento = statoIntervento;
            // this.projects = response.data.projects;
            window.onbeforeunload = null;
          }, 3000);
        })
        .catch((error) => {
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
      const response = await axios.get("http://127.0.0.1:3000/operatore");
      // console.log('Risposta GET:', response.data.operatore);
      if (response.data.operatore.length > 0) {
        const ope = response.data.operatore.filter((item) => !item.admin);
        this.comboOperatori = ope;
      } else {
        this.comboOperatori = [];
      }
    },
    async getComboCommessa() {
      const response = await axios.get("http://127.0.0.1:3000/commessa");
      console.log('Risposta GET:', response.data.commessa);
      if (response.data.commessa.length > 0) {
        this.comboCommessa = response.data.commessa;
      } else {
        this.comboCommessa = [];
      }
    },
    getComboStatiChiusura() {
      this.comboStatiChiusura = [
        { value: "Chiuso", label: "Chiuso" },
        { value: "Completato", label: "Completato" },
        { value: "Da testare", label: "Da testare" },
      ];
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
        { value: "T1", label: "" + currentYear + " T1" },
        { value: "T2", label: "" + currentYear + " T2" },
        { value: "T3", label: "" + currentYear + " T3" },
        { value: "T4", label: "" + currentYear + " T4" }
      ];

      const currentMonth = new Date().getMonth() + 1;
      console.log(currentMonth);

      if (currentMonth > 9) {
        this.comboTrimestri.push({
          value: "T1", label: "" + (currentYear + 1) + " T1"
        });
        this.comboTrimestri.splice(0, 1);
      }
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY"); // Esempio: 01/01/2022
    },
    insertUpdateRapportino(progetto) {
      event.preventDefault();
      // Salva l'oggetto progetto nella sessione
      sessionStorage.setItem("progetto", JSON.stringify(progetto));
      this.$router.push("/rapportini");
    },
    getCurrentTrimestre() {
      const currentMonth = new Date().getMonth() + 1;

      if (currentMonth > 0 && currentMonth < 4) { // T1 1-3
        return "T1";
      } else if (currentMonth > 3 && currentMonth < 7) { // T2 4-6
        return "T2";
      } else if (currentMonth > 6 && currentMonth < 10) { // T3 7-9
        return "T3";
      } else if (currentMonth > 9) { // T4 10-12
        return "T4";
      }
    }
  },
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
  padding: 0 50px;
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
}</style>
