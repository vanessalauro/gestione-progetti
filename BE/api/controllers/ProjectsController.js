/*const Project = require('../models/Project');

// Ottieni tutti i progetti
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei progetti' });
  }
};

// Ottieni un progetto per ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Progetto non trovato' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del progetto' });
  }
};

// Crea un nuovo progetto
const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = await Project.create({ title, description });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella creazione del progetto' });
  }
};

// Aggiorna un progetto
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Progetto non trovato' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento del progetto' });
  }
};

// Elimina un progetto
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Progetto non trovato' });
    }
    res.json({ message: 'Progetto eliminato correttamente' });
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'eliminazione del progetto' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};*/

const express = require("express");
const ProjectService = require("../services/ProjectService");

const router = express.Router();

router.get("/projects", (req, res) => {
  ProjectService.getAllProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.post("/projects", (req, res) => {
  const project = req.body;

  ProjectService.createProject(project)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.put("/projects/:id", (req, res) => {
  const id = req.params.id;
  const project = req.body;

  ProjectService.updateProject(id, project)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.delete("/projects/:id", (req, res) => {
  const id = req.params.id;

  ProjectService.deleteProject(id)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

module.exports = router;

