const mongoose = require("mongoose");
const Project = require("../models/Project");

class ProjectService {
  constructor() {
    this.projectModel = mongoose.model("Project");
  }

  async getAllProjects() {
    return await this.projectModel.find().sort({ createdAt: -1 });
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

module.exports = ProjectService;
