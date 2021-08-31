<template>
  <div>
  <div class="document-list">
        <v-card class="doc-card"
            color="indigo darken-4"
            v-for="doc in documents" v-bind:key="doc.id"
            elevation="2"
            >
            <v-card-subtitle>
                {{doc.originalName}}
            </v-card-subtitle>
            <v-card-text class="doc-card-text">
                {{doc.size/1000}} Ko
            </v-card-text>
            <v-card-actions>
                <v-btn
                icon
                color="primary"
                @click="displayDoc(doc)"
                >
                    <v-icon dark>
                        mdi-download
                    </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                icon
                color="primary"
                >
                    <v-icon dark>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
  </div>

  <v-dialog
      width="500"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="primary"
        fab
        large
        dark
        fixed
        bottom
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      </template>

      <add-document-dialog v-on:close-dialog="closeDialog"/>
    </v-dialog>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";
import documentService from "../../services/document-service";
import { Document } from "../../entites/document.entity";
import AddDocumentDialog from './AddDocumentDialog.vue';

@Component({
  name: 'DocumentsList',
  components: {
    AddDocumentDialog
  }
})
export default class DocumentsList extends Vue {

    public documents: Document [] = [];
    public dialog = false;

    public mounted(): void {
        this.setAllDocuments();
    }

    public async setAllDocuments(): Promise<void> {
        const docs = await documentService.findAllDocuments();
        if (docs) {
            this.documents = docs;
        }
    }

    // eslint-disable-next-line 
    public closeDialog (res?: any): void {
        if (res?.addedDocs) {
            this.documents.unshift(...res.addedDocs);
        }         
        this.dialog = false;
    }

    public async displayDoc (adocument: Document): Promise<void> {
        const anchor = document.createElement("a");
        anchor.download = adocument.originalName;
        anchor.href = await (new Document(adocument)).getPreviewUrl();
        anchor.click();
        anchor.remove();
    }

}
</script>

<style scoped>
    .document-list {
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .doc-card {
        width: 170px;
        margin: 5px;
        display: flex;
        flex-direction: column;
    }

    .doc-card-text {
        margin-top: auto;
    }
</style>