<template>
    <header id="header-rapportini" class="bg-light">
        <div class="row p-3">
            <div class="col-sm-1">
                <v-btn @click="goBack()">
                    <i class="mdi mdi-arrow-left"></i>
                </v-btn>
                <!--<button type="button" class="btn btn-primary" @click="goBack()">
                    <i class="mdi mdi-arrow-left"></i>
                </button>-->
            </div>
            <div class="col-sm-6 mt-3">
                Rapportini di Sviluppo {{ progettoInfo?.idIntervento }} -
                {{ progettoInfo?.descrIntervento }}
            </div>
            <div class="col-sm-5 mt-3 text-right">
                <span>Le ore rapportinate sono
                    {{ rapportini.length > 0 ? oreTotaliRapportinate : '0:00' }} quelle stimate {{ progettoInfo?.effort * 8
                    }}:00
                </span>
            </div>
        </div>
    </header>
    <div class="row mt-4 mb-4">
        <div class="col-sm-2 border-right bg-light text-center">
            <div class="row" style="min-height: 500px">
                <div class="col-sm-12">
                    <div class="btn-group-vertical m-2" role="group">
                        <!--<button class="btn btn-primary p-3 btn-check" v-for="rapportino in rapportini" :key="rapportino"
                            @click="viewRapportino(rapportino)">
                            {{ rapportino._id.substring(0, 10) }} -
                            {{ formatDate(rapportino.dataRapportino) }}
                        </button>-->
                        <div v-for="rapportino in rapportini">
                            <v-btn class="mt-2" @click="viewRapportino(rapportino)">
                                {{ rapportino._id.substring(0, 10) }} - {{ formatDate(rapportino.dataRapportino) }}
                            </v-btn>
                            <!--<input type="radio" class="btn-check" name="btnradio" @click="viewRapportino(rapportino)"
                                :id="'btnradio' + rapportino._id.substring(0, 10)" autocomplete="off" checked>
                            <label class="btn btn-primary p-3" :for="'btnradio' + rapportino._id.substring(0, 10)">
                                {{ rapportino._id.substring(0, 10) }} -
                                {{ formatDate(rapportino.dataRapportino) }}
                            </label>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 text-center">
                    <v-btn data-dismiss="modal" @click="nuovoRapportino()">
                        <i class="mdi mdi-note-outline"></i>Nuovo Rapportino
                    </v-btn>
                    <!--<button type="button" class="btn btn-secondary" data-dismiss="modal" @click="nuovoRapportino()">
                        <i class="mdi mdi-note-outline"></i>Nuovo Rapportino
                    </button>-->
                </div>
            </div>
        </div>
        <div class="col-sm-9 bg-light">
            <div class="row m-auto p-5 text-center" v-if="loadingRap">
                <div class="col-sm-12">
                    <i class="mdi mdi-loading mdi-spin mdi-48px"></i>
                </div>
            </div>
            <div class="row" v-if="!loadingRap">
                <div class="col-sm-12">
                    <div class="row mt-3 mb-2" v-if="modelRap.idRapportino">
                        <div class="col-sm-2">
                            <span class="key color-light">Id Rapportino</span>
                        </div>
                        <div class="col-sm-8">{{ modelRap.idRapportino.substring(0,10) }}</div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Commessa</span>
                        </div>
                        <div class="col-sm-8">{{ modelRap.commessa.numeroCommessa }} - {{ modelRap.commessa.nomeCommessa }}
                        </div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Tipologia</span>
                        </div>
                        <div class="col-sm-8">Sviluppo</div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Operatore</span>
                        </div>
                        <div class="col-sm-4">
                            <select class="form-control" id="operatore" v-model="modelRap.operatore">
                                <option value="" disabled selected>Operatore</option>
                                <option v-for="op in comboOperatori" :value="op._id">
                                    {{ op.nome }} {{ op.cognome }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Data</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="date" class="form-control" id="data" v-model="modelRap.dataRapportino">
                        </div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Descrizione</span>
                        </div>
                        <div class="col-sm-8">
                            <textarea class="form-control" name="comment" cols="40" rows="10"
                                v-model="modelRap.descrizioneRapportino"></textarea>
                        </div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Ore di Lavoro</span>
                        </div>
                        <div class="col-sm-2">
                            <input type="number" class="form-control" id="ora" v-model="modelRap.oreRapportino">
                        </div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Minuti di Lavoro</span>
                        </div>
                        <div class="col-sm-2">
                            <input type="number" class="form-control" id="minuti" v-model="modelRap.minutiRapportino">
                        </div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <v-btn data-dismiss="modal" v-if="modelRap && modelRap.idRapportino && modelRap.idRapportino.length">
                                <i class="mdi mdi-close"></i>Cancella

                                <v-dialog v-model="deleteRapportinoDialog" activator="parent" width="500">
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Elimina rapportino</span>
                                        </v-card-title>
                                        <v-card-body>
                                            <div class="form-group m-4">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <p>Sicuro di voler cancellare il rapportino?</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-card-body>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue-darken-1" variant="text"
                                                @click="deleteRapportinoDialog = false">
                                                Annulla
                                            </v-btn>
                                            <v-btn color="blue-darken-1" variant="text"
                                                @click="deleteRapportino()">
                                                Conferma
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                            <v-btn data-dismiss="modal" v-if="!modelRap.idRapportino" @click="resetRapportino()">
                                <i class="mdi mdi-close"></i>Cancella
                            </v-btn>
                            <!--<button type="button" class="btn btn-secondary" data-dismiss="modal"
                                @click="cancellaModaleRapportino()">
                                <i class="mdi mdi-close"></i>Cancella
                            </button>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer id="footer-rapportini" class="bg-light">
        <v-btn class="m-3 float-right" data-dismiss="modal" color="#5fcdcd" @click="confermaModaleRapportino()">
            <i class="mdi mdi-note-outline"></i>Conferma
        </v-btn>
        <v-btn class="m-3 float-right" data-dismiss="modal" @click="annullaModaleRapportino()">
            <i class="mdi mdi-note-outline"></i>Annulla
        </v-btn>
        <!--<button type="button" class="btn btn-primary m-3 float-right" data-dismiss="modal"
            @click="confermaModaleRapportino()">
            <i class="mdi mdi-note-outline"></i>Conferma
        </button>
        <button type="button" class="btn btn-secondary m-3 float-right" data-dismiss="modal"
            @click="annullaModaleRapportino()">
            <i class="mdi mdi-note-outline"></i>Annulla
        </button>-->
    </footer>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { toRaw } from "vue";

export default {
    name: "RapportiniPage",
    data() {
        return {
            modelRap: {
                idRapportino: "",
                commessa: "",
                operatore: "",
                dataRapportino: null,
                descrizioneRapportino: "",
                oreRapportino: 8,
                minutiRapportino: 0
            },
            progettoInfo: {},
            loadingRap: false,
            comboOperatori: [],
            rapportini: [],
            oreTotaliRapportinate: "",
            rawRapportino: null,
            deleteRapportinoDialog: false,
            idRapportinoRaw: ""
        }

    },
    mounted() {
        const progetto = sessionStorage.getItem("progetto");
        this.progettoInfo = JSON.parse(progetto);

        console.log(this.progettoInfo);

        this.setModel();

        this.getComboOperatori();

        this.getRapportiniByProjectId();
    },
    methods: {
        nuovoRapportino() {
            this.loadingRap = true;
            setTimeout(() => {
                this.setModel();
                this.loadingRap = false;
            }, 2000);
        },
        confermaModaleRapportino() {
            // inserimento del rapportino
            this.loadingRap = true;
            if (this.modelRap.idRapportino) { // edit
                return axios.post("http://127.0.0.1:3000/editRapportino", {
                    rapportinoDaModificare: {
                        idRapportino: this.rawRapportino._id,
                        idProgetto: this.progettoInfo._id,
                        operatore: this.modelRap.operatore,
                        commessa: this.progettoInfo.commessa,
                        dataRapportino: moment(new Date(this.modelRap.dataRapportino)).format("YYYY-MM-DD"),
                        descrizioneRapportino: this.modelRap.descrizioneRapportino,
                        oreRapportino: this.modelRap.oreRapportino,
                        minutiRapportino: this.modelRap.minutiRapportino
                    },
                }).then((response) => {
                    console.log("Risposta POST:", response.data);
                    setTimeout(() => {
                        this.getRapportiniByProjectId();
                        this.setModel();
                        this.loadingRap = false;
                    }, 2000)
                })
                    .catch((error) => {
                        console.log("Errore:", error);
                    });
            } else { // insert
                return axios.put("http://127.0.0.1:3000/nuovoRapportino", {
                    rapportinoDaInserire: {
                        idProgetto: this.progettoInfo._id,
                        operatore: this.modelRap.operatore,
                        commessa: this.progettoInfo.commessa,
                        dataRapportino: moment(new Date(this.modelRap.dataRapportino)).format("YYYY-MM-DD"),
                        descrizioneRapportino: this.modelRap.descrizioneRapportino,
                        oreRapportino: this.modelRap.oreRapportino,
                        minutiRapportino: this.modelRap.minutiRapportino
                    }
                }).then((response) => {
                    console.log("Risposta PUT:", response.data);
                    setTimeout(() => {
                        this.getRapportiniByProjectId();
                        this.setModel();
                        this.loadingRap = false;
                    }, 2000)
                })
                    .catch((error) => {
                        console.log("Errore:", error);
                    });
            }


        },
        annullaModaleRapportino() {
            this.setModel();
        },
        resetRapportino() {
            this.setModel();
        },
        deleteRapportino() {
            this.deleteRapportinoDialog = false;
            axios.post("http://127.0.0.1:3000/deleteRapportino", {
                idRapportino: this.idRapportinoRaw
            }).then((response) => {
                console.log("Risposta DELETE:", response.data);
                this.getRapportiniByProjectId();
            }).catch((error) => {
                console.log("Errore:", error);
            });
        },
        viewRapportino(rapportino) {
            this.rawRapportino = toRaw(rapportino);
            this.idRapportinoRaw = this.rawRapportino._id;
            this.modelRap = {
                idRapportino: this.rawRapportino._id.substring(0, 10),
                commessa: this.progettoInfo.commessa,
                operatore: this.rawRapportino.operatore,
                descrizioneRapportino: this.rawRapportino.descrizioneRapportino,
                oreRapportino: this.rawRapportino.oreRapportino,
                minutiRapportino: this.rawRapportino.minutiRapportino,
                dataRapportino: moment(new Date(this.rawRapportino.dataRapportino)).format("YYYY-MM-DD"),
            };
        },
        getOreTotaliRapportinate() {
            let sommaOre = 0;
            let sommaMinuti = 0;

            this.rapportini.forEach((r) => {
                sommaOre += r.oreRapportino;
                sommaMinuti += r.minutiRapportino;
            });

            let ore = sommaOre;
            let minuti = sommaMinuti;

            // Aggiungi un'ora se i minuti superano 60

            if (minuti >= 60) {
                ore++;
                minuti -= 60;
            }

            // Formatta la stringa data

            let data = `${ore}:${minuti}`;

            // Aggiungi un 0 davanti ai minuti se sono meno di 10

            if (minuti < 10) {
                data = `${ore}:0${minuti}`;
            }

            return data;
        },
        goBack() {
            this.$router.go(-1);
        },
        async getComboOperatori() {
            const response = await axios.get("http://127.0.0.1:3000/operatore");
            // console.log('Risposta GET:', response.data.operatore);
            if (response.data.operatore.length > 0) {
                const ope = response.data.operatore.filter((item) => !item.admin);
                this.comboOperatori = ope;
            } else {
                this.comboOperatori = [];
                alert("Nessun progetto trovato");
            }
        },
        setModel() {
            this.modelRap = {
                idRapportino: "",
                commessa: this.progettoInfo.commessa,
                operatore: this.progettoInfo.operatore._id,
                dataRapportino: moment(new Date()).format("YYYY-MM-DD"),
                descrizioneRapportino: "",
                oreRapportino: 8,
                minutiRapportino: 0
            }
        },
        getRapportiniByProjectId() {
            this.loadingRap = true;
            axios.get("http://127.0.0.1:3000/rapportini", {
                params: {
                    idProgetto: this.progettoInfo._id
                }
            }).then((response) => {
                console.log("Risposta GET:", response.data);
                setTimeout(() => {
                    this.rapportini = response.data.rapportini;
                    this.oreTotaliRapportinate = this.getOreTotaliRapportinate();
                    this.loadingRap = false;
                    this.setModel();
                }, 2000);
            })
                .catch((error) => {
                    console.log("Errore:", error);
                });
        },
        formatDate(date) {
            return moment(date).format("DD/MM/YYYY"); // Esempio: 01/01/2022
        }
    }
};
</script>

<style>
#header-rapportini {
    height: 70px;
    background-color: #d9d9d9;
}

#footer-rapportini {
    height: 70px;
    background-color: #d9d9d9;
}

.color-light {
    color: #5fcdcd;
}

.border-right {
    border-right: #ccc 1px solid;
}
</style>