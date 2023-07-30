<!--<template>
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
      nomeProgetto: "",
      descrizione: "",
      // documents: [],
      // projectId: this.$route.params.id,
      // modify: this.$route.params.modify
    };
  },
  mounted() {
    // this.getDocumentsFromProject(this.projectId)
  },
  components: {
    DocumentManager,
  },
  methods: {
    /*updateProject() {
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
    }*/
    submitProject() {
      // Qui puoi implementare la logica per salvare il nuovo progetto
      // Dopo il salvataggio, chiudi il modale
      this.closeModal();
    },
    closeModal() {
      // Emetti un evento per notificare al componente padre di chiudere il modale
      this.$emit('close');
    },
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
</style>-->


<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal modal-lg" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header"> This is the default title! </slot>
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">
            x
          </button>
        </header>

        <section class="modal-body">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> This is the default footer! </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'EditProject',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.modal {
  /*overflow-x: auto;*/
  display: flex;
  margin: auto;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  /*max-width: 80%;
  max-height: 80%;*/
  overflow-y: auto;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  cursor: pointer;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
