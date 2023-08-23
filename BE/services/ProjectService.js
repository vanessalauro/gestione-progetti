const mongoose = require("mongoose");
const Project = require("../models/Project");

class ProjectService {
  constructor() {
    this.projectModel = mongoose.model("Project", Project)
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

    // console.log(projects);

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
}

module.exports = new ProjectService();
