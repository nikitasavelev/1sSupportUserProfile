<template>
  <div>
    <v-btn
      v-if="i.isBlocked && !i.isDefault && !i.isArticle"
      flat
      small
      color="red"
      @click="unlock(i.id);"
    >Разблокировать</v-btn>
    <v-dialog v-model="unlockFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Вы уверены, что хотите разблокировать папку?</v-card-title>
        <v-btn color="primary" flat="flat" @click="unlockFolderDialog = false">Отменить</v-btn>
        <v-btn color="red" flat="flat" @click="confirmUnlock(true)">Разблокировать</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";

export default {
  name: "UpdateFolderStatus",
  props: {
    i: Object
  },
  data: () => ({
    folderId: "",
    unlockFolderDialog: false
  }),
  methods: {
    unlock(folderId) {
      this.unlockFolderDialog = true;
      this.folderId = folderId;
    },
    async confirmUnlock() {
      this.unlockFolderDialog = false;
      await ArticlesService.updateFolderStatus(this.folderId, false);
      this.$emit("update-folder-status");
    }
  }
};
</script>
