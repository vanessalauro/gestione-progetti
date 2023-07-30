const express = require("express");
const ProjectService = require("../../services/ProjectService");

const router = express.Router();

const projectController = {
  async getProjectsByParams(req, res) {
    try {
      const idIntervento = req.query.idIntervento;
      const numeroCommessa = req.query.numeroCommessa;
      const trimestre = req.query.trimestre;
      const operatore = req.query.operatore;
      const statoIntervento = req.query.statoIntervento;

      // console.log('req.query : ', req.query);

      const projects = await ProjectService.getProjects(idIntervento, numeroCommessa, trimestre, operatore, statoIntervento);
      if (projects && projects.length > 0) {
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ projects: projects });
      } else {
        console.log('Nessun project trovato nel db');
        return res.json({ error: 'Errore nel db' });
      }
    } catch (error) {
      console.log(error);
      return;
    }
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
  async updateProject(req, res) {
    try {
      const idIntervento = req.params.id;
      const updateData = req.body;

      const updatedProject = await ProjectService.updateProject(idIntervento, updateData);

      if (updatedProject && updatedProject.length > 0) {
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ project: updatedProject });
      } else {
        console.log('Nessun project trovato nel db');
        return res.json({ error: 'Errore nel db' });
      }
    } catch (error) {
      console.log(error);
      return;
    }
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

