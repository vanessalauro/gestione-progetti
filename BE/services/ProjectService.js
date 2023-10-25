const mongoose = require("mongoose");
const mongodb = require('mongodb');
const Project = require("../models/Project");
const Commessa = require("../models/Commessa");
const Rapportino = require("../models/Rapportini");
const Operatore = require("../models/User");
const Notifiche = require("../models/Notifiche");

class ProjectService {
  constructor() {
    this.projectModel = mongoose.model("Project", Project)
    this.commessaModel = mongoose.model("Commessa", Commessa);
    this.operatoreModel = mongoose.model("Operatore", Operatore);
    this.rapportinoModel = mongoose.model("Rapportino", Rapportino);
    this.notificheModel = mongoose.model("Notifiche", Notifiche);
  }

  async getProgressivoRapportino() {
    // Ottieni il valore massimo del campo progressivo
    // Ottieni tutti i documenti nella collezione rapportini
    const rapportini = await this.rapportinoModel.find();

    // Calcola il valore massimo del campo progressivo
    let massimoProgressivo = 0;
    for (const rapporto of rapportini) {
        const progressivo = rapporto.progressivo.split('-')[1];
        if (parseInt(progressivo) > massimoProgressivo) {
            massimoProgressivo = parseInt(progressivo);
        }
    }

    // Incrementa il progressivo
    massimoProgressivo++;

    // Converti il progressivo in stringa
    return `RAPP-${massimoProgressivo}-${new Date().getTime()}`;
  }

  async getProgressivoProgetto() {
    // Ottieni il valore massimo del campo progressivo
    // Ottieni tutti i documenti nella collezione rapportini
    const projects = await this.rapportinoModel.find();

    // Calcola il valore massimo del campo progressivo
    let massimoProgressivo = 0;
    for (const project of projects) {
        const progressivo = project.progressivo.split('-')[1];
        if (parseInt(progressivo) > massimoProgressivo) {
            massimoProgressivo = parseInt(progressivo);
        }
    }

    // Incrementa il progressivo
    massimoProgressivo++;

    // Converti il progressivo in stringa
    return `PROJ-${massimoProgressivo}-${new Date().getTime()}`;
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

      rapport.forEach(r => {
        sommaOre += r.oreRapportino;
        // console.log("sommaOre: ", sommaOre);
        sommaMinuti += r.minutiRapportino;
      });

      projects[i].giorniDiAvanzamento = ((sommaOre + (sommaMinuti / 60)) / 8).toFixed(3);
      projects[i].percentualeAvanzamento = ((projects[i].giorniDiAvanzamento / projects[i].effort) * 100).toFixed(0);

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
      const operatore = await this.operatoreModel.findById(project.operatore);
      const commessa = await this.commessaModel.findById(project.commessa);

      const progressivo = await this.getProgressivoProgetto();

      const progettoDaInserire = {
          progressivo: progressivo,
          descrIntervento: project.descrIntervento,
          trimestre: project.trimestre,
          operatore: operatore,
          stima: 0,
          effort: 0,
          commessa: commessa,
          statoIntervento: project.statoIntervento,
          inLavorazione: project.inLavorazione
      }


      const insertedProject = this.projectModel.create(progettoDaInserire);

      return insertedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

  async updateProject(idIntervento, updateData) {
    try {
      const updatedProject = await this.projectModel.findOneAndUpdate(
        { idIntervento },
        updateData,
        { new: true }
      );

      const insertNotifica = await this.notificaModel.create({
        title: "Notifica Modifica",
        body: "Progetto modificato: " + updatedProject.idIntervento,
        dataNotifica: new Date(),
        operatore: updatedProject.operatore
      });


      return updatedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
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

  async nuovoRapportino(rapportino) {
    try {
      const commessa = await this.commessaModel.findById(rapportino.commessa._id);

      const progressivo = await this.getProgressivoRapportino();
      // console.log('progressivo: ', progressivo);

      // await db.rapportini.createIndex({ progressivo: progressivo }, { unique: true });

      const rapportinoDaInserire = {
        progressivo: progressivo,
        idProgetto: rapportino.idProgetto,
        commessa: commessa,
        operatore: rapportino.operatore,
        dataRapportino: new Date(rapportino.dataRapportino),
        descrizioneRapportino: rapportino.descrizioneRapportino,
        oreRapportino: rapportino.oreRapportino,
        minutiRapportino: rapportino.minutiRapportino
      }

      // console.log('rapportinoDaInserire: ', rapportinoDaInserire);

      const nuovoRapportino = await this.rapportinoModel.create(rapportinoDaInserire);

      return nuovoRapportino;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirloInThe funzione chiamante, se necessario
    }
  }

  async updateRapportino(rapportino) {
    try {
      const commessa = await this.commessaModel.findById(rapportino.commessa._id);

      const updatedRapportino = await this.rapportinoModel.findOneAndUpdate(
        { _id: rapportino.idRapportino },
        {
          idProgetto: rapportino.idProgetto,
          commessa: commessa,
          operatore: rapportino.operatore,
          dataRapportino: new Date(rapportino.dataRapportino),
          descrizioneRapportino: rapportino.descrizioneRapportino,
          oreRapportino: rapportino.oreRapportino,
          minutiRapportino: rapportino.minutiRapportino
        },
        { new: true }
      );

      // console.log('updatedRapportino: ', updatedRapportino);

      return updatedRapportino;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error;
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

  async deleteRapportino(idRapportino) {
    try {
      const deletedRapportino = await this.rapportinoModel.deleteOne({ _id: idRapportino });
      return deletedRapportino;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error;
    }
  }
}

module.exports = new ProjectService();
