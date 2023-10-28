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
    const projects = await this.projectModel.find();

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
    let query = this.projectModel.find();

    if (idIntervento && idIntervento.length > 0) {
      query = this.projectModel.find({ "idIntervento": idIntervento });
    }

    if (numeroCommessa && numeroCommessa.length > 0) {
      query = this.projectModel.find({ "commessa": numeroCommessa });
    }

    if (trimestre && trimestre.length > 0) {
      query = this.projectModel.find({ "trimestre": trimestre });
    }

    if (operatore && operatore.length > 0) {
      query = this.projectModel.find({ "operatore": operatore });
    }

    if (statoIntervento && statoIntervento.length > 0) {
      query = this.projectModel.find({ "statoIntervento": statoIntervento });
    }

    const projects = await query
      .populate("operatore")
      .populate("commessa")
      .exec();

    for (let i = 0; i < projects.length; i++) {
      projects[i].commessa = await this.commessaModel.findById(projects[i].commessa._id);
      projects[i].operatore = await this.operatoreModel.findById(projects[i].operatore._id);

      const query = { "idProgetto": projects[i]._id }
      const rapport = await this.rapportinoModel.find(query);

      let sommaOre = 0;
      let sommaMinuti = 0;

      rapport.forEach(r => {
        sommaOre += r.oreRapportino;
        sommaMinuti += r.minutiRapportino;
      });

      projects[i].giorniDiAvanzamento = ((sommaOre + (sommaMinuti / 60)) / 8).toFixed(3);
      projects[i].percentualeAvanzamento = ((projects[i].giorniDiAvanzamento / projects[i].effort) * 100).toFixed(0);
    }

    return projects;
  }

  async updateLavorazione(idIntervento, inLavorazione, statoIntervento) {
    try {
      const updatedProject = this.projectModel.findOneAndUpdate(
        { idIntervento },
        { inLavorazione, statoIntervento },
        { new: true } // Opzione per restituire il progetto aggiornato
      );

      return updatedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

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
        stima: project.stima,
        effort: project.effort,
        commessa: commessa,
        statoIntervento: project.statoIntervento,
        inLavorazione: project.inLavorazione,
        dataInizio: project.dataInizio,
        dataFine: project.dataFine
      }

      const insertedProject = this.projectModel.create(progettoDaInserire);

      const insertNotifica = await this.notificheModel.create({
        title: "Notifica Inserimento",
        body: "Progetto creato",
        dataNotifica: new Date(),
        operatore: operatore
      });

      return insertedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

  async updateProject(progetto) {
    try {
      const commessa = await this.commessaModel.findById(progetto.commessa);
      const operatore = await this.operatoreModel.findById(progetto.operatore);

      const patch = {
        progressivo: progetto.progressivo,
        commessa: commessa,
        operatore: operatore,
        descrIntervento: progetto.descrIntervento,
        trimestre: progetto.trimestre,
        stima: progetto.stima,
        effort: progetto.effort,
        dataInizio: new Date(progetto.dataInizio),
        dataFine: new Date(progetto.dataFine),
        updatedAt: new Date()
      };
  
      const updatedProject = await this.projectModel.updateOne(
        { _id: progetto.id },
        { $set: patch },
        { upsert: true }
      );

      const id = updatedProject.idIntervento;

      const insertNotifica = await this.notificheModel.create({
        title: "Notifica Modifica",
        body: "Progetto modificato: " + id,
        dataNotifica: new Date(),
        operatore: operatore
      });

      return updatedProject;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error; // Rilancia l'errore per gestirlo nella funzione chiamante, se necessario
    }
  }

  async deleteProject(id) {
    try {
      const deletedProject = await this.projectModel.deleteOne({ "_id": id });
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

      const rapportinoDaInserire = {
        progressivo: progressivo,
        idProgetto: rapportino.idProgetto,
        commessa: commessa,
        operatore: rapportino.operatore,
        dataRapportino: new Date(rapportino.dataRapportino),
        descrizioneRapportino: rapportino.descrizioneRapportino,
        oreRapportino: rapportino.oreRapportino,
        minutiRapportino: rapportino.minutiRapportino
      };

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

      return updatedRapportino;
    } catch (error) {
      console.log('Errore nell\'aggiornamento del progetto:', error);
      throw error;
    }
  }

  async getRapportini(idProgetto) {
    try {
      // console.log('idProgetto: ', idProgetto);
      const query = { "idProgetto": idProgetto }
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
