<template>
  <div>
    <v-btn v-if="!i.isBlocked" flat small color="red" @click="deleteFolder(i.id)">Удалить</v-btn>
    <v-dialog v-model="deleteFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Вы уверены, что хотите удалить папку?</v-card-title>
        <v-btn color="primary" flat="flat" @click="deleteFolderDialog = false">Отменить</v-btn>
        <v-btn color="red" flat="flat" @click="confirmDeleteFolder(true)">Удалить</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";

export default {
  name: "DeleteFolder",
  props: {
    i: Object
  },
  data: () => ({
    folderId: "",
    deleteFolderDialog: false
  }),
  methods: {
    deleteFolder(folderId) {
      this.folderId = folderId;
      this.deleteFolderDialog = true;
    },
    async confirmDeleteFolder() {
      this.deleteFolderDialog = false;
      await ArticlesService.deleteFolder(this.folderId);
      this.$emit("delete-folder");
    }
  }
};
</script>
