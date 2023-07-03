<template>
    <div id="dashboard">
        <Navbar></Navbar>
        <div class="content">
            <h1>Content</h1>
            <div class="projects">
                <div v-for="project in projects" :key="project.id" class="project">
                    <h2 class="project__name">{{ project.name }}</h2>
                    <p class="project__description">{{ project.description }}</p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
  
<script>
import mongoose from "mongoose";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

export default {
    name: "Dashboard",
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            projects: []
        };
    },
    mounted() {
        // Get the list of projects from the database
        this.getProjects();
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
        }
    }
};
</script>
  
<style>
#dashboard {
    margin: 0 auto;
    width: 100%;
}

nav {
    background-color: #ff0000;
    color: #fff;
    padding: 10px;
}

.content {
    margin-top: 10px;
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
  