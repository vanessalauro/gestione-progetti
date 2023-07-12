const mongoose = require("mongoose");
const Commessa = require("../models/Commessa");
const Operatore = require("../models/Operatore");
const Nucleo = require("../models/Nucleo");
const Team = require("../models/Team");

class ComboService {
    constructor() {
        this.commessaModel = mongoose.model("Commessa", Commessa);
        this.operatoreModel = mongoose.model("Operatore", Operatore);
        this.nucleoModel = mongoose.model("Nucleo", Nucleo);
        this.teamModel = mongoose.model("Team", Team);
    }

    async getAllCommesse() {
        const commessa = await this.commessaModel.find();
        if (commessa) {
            return commessa;
        } else {
            // console.log('Nessuna commessa trovata nel db');
            return null;
        }
    }

    async getAllOperatori() {
        const operatore = await this.operatoreModel.find();
        if (operatore) {
            return operatore;
        } else {
            // console.log('Nessun operatore trovato nel db');
            return null;
        }
    }

    async getAllNuclei() {
        const nuclei = await this.nucleoModel.find();
        if (nuclei) {
            return nuclei;
        } else {
            // console.log('Nessun nucleo trovato nel db');
            return null;
        }
    }

    async getAllTeams() {
        // console.log('getAllTeams : ', this.teamModel.find());
        const teams = await this.teamModel.find();
        // console.log(teams);
        if (teams) {
            return teams;
        } else {
            // console.log('Nessun team trovato nel db');
            return null;
        }
    }
}

module.exports = new ComboService();
