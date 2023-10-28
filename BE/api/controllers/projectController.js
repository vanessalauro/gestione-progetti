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
        console.log('Ricerca conclusa, progetti trovati');
        return res.json({ projects: projects });
      } else {
        console.log('Nessun progetto trovato nel db');
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

      // console.log('idIntervento: ', idIntervento, 'inLavorazione: ', inLavorazione, 'statoIntervento: ', statoIntervento);

      const updatedProject = await ProjectService.updateLavorazione(idIntervento, inLavorazione, statoIntervento);
      if (updatedProject) {
        console.log('Progetto modificato, cambio stato in lavorazione');
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

      // console.log('newProject: ', newProject);

      const insertProject = await ProjectService.createProject(newProject);

      // console.log('insertProject: ', insertProject);
      if (insertProject) {
        console.log('Inserimento progetto concluso con successo');
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
  /*getProjectById(req, res) {
    const id = req.params.id;
    ProjectService.getProjectById(id)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },*/
  async updateProject(req, res) {
    try {
      const { progettoDaModificare } = req.body;

      // console.log(progettoDaModificare);

      //console.log('updateProject: ', updateProject);
      //console.log('idIntervento: ', idIntervento);

      const updatedProject = await ProjectService.updateProject(progettoDaModificare);
      if (updatedProject) {
        console.log('Progetto modificato con successo');
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
      const { id } = req.body;
      // console.log('idIntervento: ', idIntervento);
      const deletedProject = await ProjectService.deleteProject(id);
      if (deletedProject) {
        console.log('Progetto eliminato con successo');
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
      // console.log('idIntervento: ', idIntervento);
      const closedProject = await ProjectService.closeIntervento(idIntervento, statoIntervento);
      if (closedProject) {
        console.log('Progetto chiuso');
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ closedProject: closedProject });
      } else {
        return res.json({ error: 'Errore nel db' });  
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },

  async nuovoRapportino(req, res) {
    try {
      const { rapportinoDaInserire } = req.body;
      // console.log('progetto: ', progetto);
      // console.log('rapportinoDaInserire: ', rapportinoDaInserire);
      const nuovoRapportino = await ProjectService.nuovoRapportino(rapportinoDaInserire);
      if (nuovoRapportino) {
        console.log('Inserimento rapportino avvenuto con successo');
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ nuovoRapportino: nuovoRapportino });
      } else {
        return res.json({ error: 'Errore nel db' });  
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },

  async updateRapportino(req, res) {
    try {
      const { rapportinoDaModificare } = req.body;
      // console.log('rapportinoDaModificare :', rapportinoDaModificare);
      const updateRapportino = await ProjectService.updateRapportino(rapportinoDaModificare);
      if (updateRapportino) {
        console.log('Modifica rapportino avvenuto con successo');
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ updateRapportino: updateRapportino });
      } else {
        return res.json({ error: 'Errore nel db' });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },

  async getRapportini(req, res) {
    try {
      const idProgetto = req.query.idProgetto;
      // console.log('idProgetto: ', idProgetto);
      const rapportini = await ProjectService.getRapportini(idProgetto);
      if (rapportini) {
        console.log('Ricerca rapportini avvenuta con successo');
        console.log('Totale rapportini presenti per questo progetto: ', rapportini.length);
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ rapportini: rapportini });
      } else {
        return res.json({ error: 'Errore nel db' });  
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },

  async deleteRapportino(req, res) {
    try {
      const { idRapportino } = req.body;
      // console.log('idRapportino: ', idRapportino);
      const deletedRapportino = await ProjectService.deleteRapportino(idRapportino);
      if (deletedRapportino) {
        console.log('Eliminazione rapportino avvenuta con successo');
        // console.log('getProjectsByParams : ', res.json({ projects: projects }));
        return res.json({ deletedRapportino: deletedRapportino });
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

