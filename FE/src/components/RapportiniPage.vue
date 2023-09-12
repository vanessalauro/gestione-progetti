<template>
    <header id="header-rapportini" class="bg-light">
        <div class="row p-3">
            <div class="col-sm-1">
                <button type="button" class="btn btn-primary" @click="goBack()">
                    <i class="mdi mdi-arrow-left"></i>
                </button>
            </div>
            <div class="col-sm-6 mt-3">
                Rapportini di Sviluppo {{ progettoInfo?.idIntervento }} -
                {{ progettoInfo?.descrIntervento }}
            </div>
            <div class="col-sm-5 mt-3 text-right">
                <span>Le ore rapportinate sono
                    {{ progettoInfo?.rapportini ? getOreTotaliRapportinate(progettoInfo?.rapportini) :
                        '0:00' }} quelle stimate
                    {{ progettoInfo?.effort * 8 }}:00 </span>
            </div>
        </div>
    </header>
    <div class="row mt-4 mb-4">
        <div class="col-sm-2 border-right bg-light">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row" style="min-height: 500px">
                        <div class="col-sm-12">
                            <div class="btn-group-vertical">
                                <button class="btn btn-primary" v-for="rapportino in progettoInfo.rapportini"
                                    :key="rapportino" @click="viewRapportino(rapportino)">
                                    {{ rapportino.idRapportino }} -
                                    {{ formatDate(rapportino.dataRapportino) }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="nuovoRapportino()">
                                <i class="mdi mdi-note-outline"></i>Nuovo Rapportino
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-10 bg-light">
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
                        <div class="col-sm-8">{{ modelRap.idRapportino }}</div>
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-sm-2">
                            <span class="key color-light">Commessa</span>
                        </div>
                        <div class="col-sm-8"></div>
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
                            <select class="form-control" id="operatore" v-model="modelRap.operatore.username">
                                <option value="" disabled selected>Operatore</option>
                                <option v-for="op in comboOperatori" :value="op.id">
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
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                @click="cancellaModaleRapportino()">
                                <i class="mdi mdi-close"></i>Cancella
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <footer id="footer-rapportini" class="bg-light">
        <button type="button" class="btn btn-primary m-3 float-right" data-dismiss="modal"
            @click="confermaModaleRapportino()">
            <i class="mdi mdi-note-outline"></i>Conferma
        </button>
        <button type="button" class="btn btn-secondary m-3 float-right" data-dismiss="modal"
            @click="annullaModaleRapportino()">
            <i class="mdi mdi-note-outline"></i>Annulla
        </button>
    </footer>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
        }

    },
    mounted() {
        const progetto = sessionStorage.getItem("progetto");
        this.progettoInfo = JSON.parse(progetto);

        console.log(this.progettoInfo);

        this.setModel();

        this.getComboOperatori();
    },
    methods: {
        nuovoRapportino() {
            this.loadingRap = true;
            setTimeout(() => {
                this.setModel();

                this.loadingRap = false;
            }, 2000)
        },
        confermaModaleRapportino() { },
        annullaModaleRapportino() {

        },
        cancellaModaleRapportino() { },
        viewRapportino(rapportino) { },
        getOreTotaliRapportinate(rapportini) {
            let sommaOre = 0;
            let sommaMinuti = 0;

            rapportini.forEach((r) => {
                sommaOre += r.ore;
                sommaMinuti += r.minuti;
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
                operatore: "",
                dataRapportino: moment(new Date()).format("YYYY-MM-DD"),
                descrizioneRapportino: "",
                oreRapportino: 8,
                minutiRapportino: 0

            }
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