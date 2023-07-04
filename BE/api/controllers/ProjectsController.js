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

