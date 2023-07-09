<template>
    <div id="admin-manager">
        <h1>Admin Manager</h1>
        <div class="projects">
            <div v-for="project in projects" :key="project.id" class="project">
                <h2 class="project__name">{{ project.name }}</h2>
                <p class="project__description">{{ project.description }}</p>
            </div>
        </div>
        <button @click="addProject">Add Project</button>
    </div>
</template>
  
<script>
import mongoose from "mongoose";

export default {
    name: "AdminManager",
    data() {
        return {
            projects: []
        };
    },
    mounted() {
        // Get the list of projects from the database
        // this.getProjects();
    },
    methods: {
        getProjects() {
            // Connect to the MongoDB database
            mongoose.connect("mongodb://localhost:27017/gestione-progetti-db");

            // Get the projects collection
            const projectsCollection = mongoose.model("Projects");

            // Get the list of projects
            projectsCollection.find({}, (err, projects) => {
                if (err) {
                    console.error(err);
                } else {
                    this.projects = projects;
                }
            });
        },
        addProject() {
            // TODO: Implement a method to add a project to the database
            const projectName = prompt("Enter the project name");
            const projectDescription = prompt("Enter the project description");

            // Create a new project object
            const newProject = {
                name: projectName,
                description: projectDescription
            };

            // Add the new project to the database
            // TODO: Implement this code

            mongoose.connect("mongodb://localhost:27017/gestione-progetti-db");

            const projectsCollection = mongoose.model("Projects");

            projectsCollection.insertOne(newProject, (err, project) => {
                if (err) {
                    console.error(err);
                } else {
                    this.projects.push(project);
                }
            });
        }
    }
};
</script>
  
<style>
#admin-manager {
    margin: 0 auto;
    width: 300px;
}

h1 {
    text-align: center;
}

.projects {
    display: flex;
    flex-wrap: wrap;
}

.project {
    margin: 10px;
}

.project__name {
    flex-grow: 1;
}

.project__description {
    flex-grow: 2;
}
</style>
  