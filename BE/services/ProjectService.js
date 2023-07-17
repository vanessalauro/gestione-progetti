const mongoose = require("mongoose");
const Project = require("../models/Project");

class ProjectService {
  constructor() {
    this.projectModel = mongoose.model("Project", Project)
  }

  async getAllProjects(/*campi*/) {
    const projects = await this.projectModel.find();
    if (projects) {
      console.log(projects);
      return projects;
    } else {
      return null;
    }
  }

  async getProjectById(id) {
    return await this.projectModel.findById(id);
  }

  async createProject(project) {
    return await this.projectModel.create(project);
  }

  async updateProject(id, project) {
    return await this.projectModel.findByIdAndUpdate(id, project, {
      new: true,
    });
  }

  async deleteProject(id) {
    return await this.projectModel.deleteOne({ _id: id });
  }
}

module.exports = new ProjectService();
