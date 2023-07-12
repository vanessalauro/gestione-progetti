<template>
  <div id="edit-project">
    <h1>Edit Project</h1>
    <div class="form-group">
      <label for="projectName">Project name</label>
      <input type="text" id="projectName" v-model="projectName" />
    </div>
    <div class="form-group">
      <label for="projectDescription">Project description</label>
      <textarea id="projectDescription" v-model="projectDescription"></textarea>
    </div>
    <div class="form-group">
      <label for="documents">Documents</label>
      <document-manager v-model="documents"></document-manager>
    </div>
    <button @click="updateProject">Update Project</button>
  </div>
</template>

<script>
import axios from 'axios';
import DocumentManager from "./DocumentManager.vue";

export default {
  name: "EditProject",
  data() {
    return {
      projectName: "",
      projectDescription: "",
      documents: [],
      projectId: this.$route.params.id,
      modify: this.$route.params.modify
    };
  },
  mounted() {
    this.getDocumentsFromProject(this.projectId)
  },
  components: {
    DocumentManager,
  },
  methods: {
    updateProject() {
      const updateProject = {
        // Ottieni i campi del progetto modificati dal form
        // E crea un oggetto con le nuove informazioni
        id: this.projectId,
        title: this.projectName,
        description: this.projectDescription,

        // ...
      };

      axios.post("http://localhost:3000/projects/${this.projectId}", updatedProject)
        .then((response) => {
          // La richiesta di aggiornamento è stata eseguita con successo
          console.log("Progetto aggiornato:", response.data);
          // Esegui le azioni necessarie in caso di successo
        })
        .catch((error) => {
          // Si è verificato un errore durante la richiesta di aggiornamento
          console.error("Errore durante l'aggiornamento del progetto:", error);
          // Esegui le azioni necessarie in caso di errore
        });
    },
    insertProject() {
      const updateProject = {
        // Ottieni i campi del progetto modificati dal form
        // E crea un oggetto con le nuove informazioni
        title: this.updatedTitle,
        description: this.updatedDescription,
        // ...
      };

      // Effettua una richiesta PUT a un endpoint appropriato per aggiornare il progetto
      axios.put("http://localhost:3000/projects/${this.projectId}", updatedProject)
        .then((response) => {
          // La richiesta di aggiornamento è stata eseguita con successo
          console.log("Progetto inserito:", response.data);
          // Esegui le azioni necessarie in caso di successo
        })
        .catch((error) => {
          // Si è verificato un errore durante la richiesta di aggiornamento
          console.error("Errore durante l'inserimento del progetto:", error);
          // Esegui le azioni necessarie in caso di errore
        });
    },
    getDocumentsFromProject(id) {
      axios.get("http://localhost:3000/documents/${this.projectId}", updatedProject)
        .then((response) => {
          // La richiesta di aggiornamento è stata eseguita con successo
          console.log("Documenti relativi al progetto trovati:", response.data);
          // Esegui le azioni necessarie in caso di successo
          if (response.data) {
            this.documents = response.data;
          }
        })
        .catch((error) => {
          // Si è verificato un errore durante la richiesta di aggiornamento
          console.error("Errore durante la richiesta al database:", error);
          // Esegui le azioni necessarie in caso di errore
        });
    }
  },
};
</script>

<style>
#edit-project {
  margin: 0 auto;
  width: 300px;
}

h1 {
  text-align: center;
}

input,
textarea {
  margin: 10px;
}
</style>
