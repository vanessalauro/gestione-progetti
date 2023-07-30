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

    console.log(projects);

    return projects;
  }

  async getProjectById(id) {
    return await this.projectModel.findById(id);
  }

  async createProject(project) {
    return await this.projectModel.create(project);
  }

  async updateProject(idIntervento, updateData) {
    return await this.projectModel.findByIdAndUpdate({idIntervento}, updateData, {
      new: true,
    });
  }

  async deleteProject(id) {
    return await this.projectModel.deleteOne({ _id: id });
  }
}

module.exports = new ProjectService();
