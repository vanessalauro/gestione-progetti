const express = require("express");
const ProjectService = require("../../services/ProjectService");

const router = express.Router();

const projectController = {
  getAllProjects(req, res) {
    ProjectService.getAllProjects()
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
  getProjectById(req, res) {
    const id = req.params.id;
    ProjectService.getProjectById(id)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
  createProject(req, res) {
    const project = req.body;

    ProjectService.createProject(project)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
  updateProject(req, res) {
    const id = req.params.id;
    const project = req.body;
    ProjectService.updateProject(id, project)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  },
  deleteProject(req, res) {
    const id = req.params.id;
    ProjectService.deleteProject(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  },
}

module.exports = projectController;

