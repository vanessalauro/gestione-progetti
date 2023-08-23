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
  async updateLavorazione(req, res) {
    try {
      const { idIntervento, inLavorazione, statoIntervento } = req.body;

      console.log('idIntervento: ', idIntervento, 'inLavorazione: ', inLavorazione, 'statoIntervento: ', statoIntervento);

      const updatedProject = await ProjectService.updateLavorazione(idIntervento, inLavorazione, statoIntervento);
      if (updatedProject) {
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ projects: updatedProject });
      } else {
        console.log('Nessun project trovato nel db');
        return res.json({ error: 'Errore nel db' });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
  async createProject(req, res) {
    try {
      const newProject = req.body;

      console.log('newProject: ', newProject);

      const insertProject = await ProjectService.createProject(newProject);
      if (insertProject) {
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ insertProject: insertProject });
      } else {
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
  async updateProject(req, res) {
    try {
      const updateProject = req.body;
      const { idIntervento } = updateProject;

      console.log('updateProject: ', updateProject);
      console.log('idIntervento: ', idIntervento);

      const updatedProject = await ProjectService.updateProject(idIntervento, updateProject);
      if (updatedProject) {
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ updateProject: updatedProject });
      } else {
        return res.json({ error: 'Errore nel db' });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
  async deleteProject(req, res) {
    try {
      const { idIntervento } = req.body;
      console.log('idIntervento: ', idIntervento);
      const deletedProject = await ProjectService.deleteProject(idIntervento);
      if (deletedProject) {
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ deletedProject: deletedProject });
      } else {
        return res.json({ error: 'Errore nel db' });  
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },

  async closeIntervento(req, res) {
    try {
      const { idIntervento, statoIntervento } = req.body;
      console.log('idIntervento: ', idIntervento);
      const closedProject = await ProjectService.closeIntervento(idIntervento, statoIntervento);
      if (closedProject) {
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ closedProject: closedProject });
      } else {
        return res.json({ error: 'Errore nel db' });  
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

module.exports = projectController;

