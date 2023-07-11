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
import mongoose from "mongoose";
import DocumentManager from "./DocumentManager.vue";

export default {
    name: "EditProject",
    data() {
        return {
            projectName: "",
            projectDescription: "",
            documents: [],
        };
    },
    components: {
        DocumentManager,
    },
    methods: {
        updateProject() {

            // Connect to the MongoDB database
            mongoose.connect("mongodb://127.0.0.1:27017/gestione-progetti?autoDiscover=false");

            // Get the project ID from the URL
            const projectId = this.$route.params.id;

            // Get the project collection
            const projectsCollection = mongoose.model("Projects");

            // Update the project in the collection
            projectsCollection.updateOne({ _id: projectId }, {
                name: this.projectName,
                description: this.projectDescription,
                documents: this.documents,
            });
        }
    }
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
  