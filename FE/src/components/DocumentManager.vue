<template>
    <div>
        <!-- Elenco dei documenti -->
        <ul>
            <li v-for="document in documents" :key="document.id">
                {{ document.name }}
                <button @click="editDocument(document)">Modifica</button>
                <button @click="deleteDocument(document)">Elimina</button>
            </li>
        </ul>

        <!-- Modale per la creazione/modifica del documento -->
        <div v-if="showModal">
            <input v-model="documentName" placeholder="Nome del documento" />
            <quill-editor v-model="documentContent" />
            <button @click="saveDocument">Salva</button>
        </div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            showModal: false,
            documentName: '',
            documentContent: '',
            selectedDocument: null,
        };
    },
    computed: {
        ...mapGetters(['documents']),
    },
    methods: {
        ...mapActions(['createDocument', 'updateDocument', 'deleteDocument']),
        createNewDocument() {
            this.showModal = true;
            this.selectedDocument = null;
            this.documentName = '';
            this.documentContent = '';
        },
        editDocument(document) {
            this.showModal = true;
            this.selectedDocument = document;
            this.documentName = document.name;
            this.documentContent = document.content;
        },
        saveDocument() {
            if (this.selectedDocument) {
                // Modifica del documento esistente
                const updatedDocument = {
                    id: this.selectedDocument.id,
                    name: this.documentName,
                    content: this.documentContent,
                };
                this.updateDocument(updatedDocument);
                // Esegui qui la notifica agli altri utenti coinvolti
            } else {
                // Creazione di un nuovo documento
                const newDocument = {
                    name: this.documentName,
                    content: this.documentContent,
                };
                this.createDocument(newDocument);
            }
            this.showModal = false;
        },
        deleteDocument(document) {
            this.deleteDocument(document.id);
            // Esegui qui la notifica agli altri utenti coinvolti
        },
    },
};
</script>
  
  
<style>
#document-manager {
    margin: 0 auto;
    width: 300px;
}

h1 {
    text-align: center;
}

.documents {
    display: flex;
    flex-wrap: wrap;
}

.document {
    margin-bottom: 10px;
}
</style>