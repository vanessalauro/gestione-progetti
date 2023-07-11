<template>
    <div id="user-projects">
      <h1>User Projects</h1>
      <div class="projects">
        <div v-for="project in projects" :key="project.id" class="project">
          <h2 class="project__name">{{ project.name }}</h2>
          <p class="project__description">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import mongoose from "mongoose";
  
  export default {
    name: "UserProjects",
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
        // TODO: Implement a method to get the list of projects from the database
        mongoose.connect("mongodb://127.0.0.1:27017/gestione-progetti?autoDiscover=false");
  
        const projectsCollection = mongoose.model("Projects");
  
        projectsCollection.find({ user: this.userId }, (err, projects) => {
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
  #user-projects {
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
  