const mongoose = require("mongoose");
const mongodb = require('mongodb');
const Project = require("../models/Project");
const Commessa = require("../models/Commessa");
const Rapportino = require("../models/Rapportini");
const Operatore = require("../models/User");

class ProjectService {
  constructor() {
    this.projectModel = mongoose.model("Project", Project)
    this.commessaModel = mongoose.model("Commessa", Commessa);
    this.operatoreModel = mongoose.model("Operatore", Operatore);
    this.rapportinoModel = mongoose.model("Rapportino", Rapportino);
  }

  async getProjects(idIntervento, numeroCommessa, trimestre, operatore, statoIntervento) {
    const query = this.projectModel.find();

    // console.log(query);

    if (idIntervento && idIntervento.length > 0) {
      query = query.where("idIntervento", "like", `%${idIntervento}%`);
    }

    if (numeroCommessa && numeroCommessa.length > 0) {
      query = query.where("commessa", "like", `%${numeroCommessa}%`);
    }

    if (trimestre && trimestre.length > 0) {
      query = query.where("trimestre", "like", `%${trimestre}%`);
    }

    if (operatore && operatore.length > 0) {
      query = query.where("operatore", "like", `%${operatore}%`);
    }

    if (statoIntervento && statoIntervento.length > 0) {
      query = query.where("statoIntervento", "like", `%${statoIntervento}%`);
    }

    const projects = await query
      .populate("operatore")
      .populate("commessa")
      .exec();

    // console.log("progetti: ", projects);

    for (let i = 0; i < projects.length; i++) {
      projects[i].commessa = await this.commessaModel.findById(projects[i].commessa._id);
      projects[i].operatore = await this.operatoreModel.findById(projects[i].operatore._id);

      const query = {
        progetto: {
          _id: new mongodb.ObjectId(projects[i]._id)
        }
      }
      const rapport = await this.rapportinoModel.find(query);

      // console.log("rapport: ", rapport);

      let sommaOre = 0;
      let sommaMinuti = 0;

      rapport.forEach(r =>{
        sommaOre += r.oreRapportino;
        console.log("sommaOre: ", sommaOre);
        sommaMinuti += r.minutiRapportino;
      });

      projects[i].giorniDiAvanzamento = (sommaOre + (sommaMinuti / 60) ) / 8;
      projects[i].percentualeAvanzamento = (projects[i].giorniDiAvanzamento / projects[i].effort) * 100;

      // console.log("giorniDiAvanzamento: ", projects[i].giorniDiAvanzamento);
      // console.log("percentualeAvanzamento: ", projects[i].percentualeAvanzamento);
    }

    // console.log("progetti: ", projects);

    return projects;
  }

  async updateLavorazione(idIntervento, inLavorazione, statoIntervento) {
    try {
      const updatedProject = this.projectModel.findOneAndUpdate(
        { idIntervento },
        { inLavorazione, statoIntervento },
        { new: true } // Opzione per restituire il progetto aggiornato
      );

      // console.log('updateLavorazione :', updatedProject);

      return updatedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

  /* async getProjectById(id) {
    return await this.projectModel.findById(id);
  }*/

  async createProject(project) {
    try {
      const insertedProject = this.projectModel.create(project);
      return insertedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

  async updateProject(idIntervento, updateData) {
    return await this.projectModel.findOneAndUpdate(
      { idIntervento },
      updateData,
      { new: true }
    );
  }

  async deleteProject(idIntervento) {
    try {
      const deletedProject = await this.projectModel.deleteOne({ idIntervento: idIntervento });
      return deletedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

  async closeIntervento(idIntervento, statoIntervento) {
    try {
      const closedProject = await this.projectModel.findOneAndUpdate(
        { idIntervento },
        { statoIntervento: statoIntervento },
        { new: true }
      );
      return closedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

  async nuovoRapportino(progetto, rapportino) {
    try {
      const project = await this.projectModel.findById(progetto._id);
      const operator = await this.operatoreModel.findById(progetto.operatore._id);

      // console.log('project: ', project);
      // console.log('operator: ', operator);

      const nuovoRapportino = await this.rapportinoModel.create({
        progetto: project,
        operatore: operator,
        dataRapportino: new Date(rapportino.dataRapportino),
        descrizioneRapportino: rapportino.descrizioneRapportino,
        oreRapportino: rapportino.oreRapportino,
        minutiRapportino: rapportino.minutiRapportino
      });

      // console.log('nuovoRapportino: ', nuovoRapportino);

      return nuovoRapportino;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirloInThe funzione chiamante, se necessario
    }
  }

  async getRapportini(idProgetto) {
    try {
      // console.log('idProgetto: ', idProgetto);
      const query = {
        progetto: {
          _id: new mongodb.ObjectId(idProgetto)
        }
      }
      const rapportini = await this.rapportinoModel.find(query);
      // console.log('rapportini: ', rapportini);
      return rapportini;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error;
    }
  }
}

module.exports = new ProjectService();
