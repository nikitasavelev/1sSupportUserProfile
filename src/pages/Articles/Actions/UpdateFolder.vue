<template>
  <div>
    <v-btn v-if="!item.isBlocked && !item.isArticle" flat small @click="updateFolder(item)">Редактировать</v-btn>
    <v-dialog v-model="updateFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Редактирование папки</v-card-title>
        <v-form ref="form" class="mx-3 pb-3">
          <v-text-field v-model="name" :rules="nameRules" label="Название" required/>

          <change-directory
            @change-directory="changeDirectory"
            :items="fullItems"
            :folderId="folderId"
            :parentId="parentId"
          />

          <v-checkbox class="pa-0" v-model="checkboxBlock" label="Заблокирована"/>

          <v-checkbox class="pa-0" v-model="checkboxAvailable" label="Доступна для клиентов"/>

          <v-btn color="red" flat @click="cancel">Отменить</v-btn>

          <v-btn color="primary" flat @click="confirmUpdateFolder">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import ChangeDirectory from "./ChangeDirectory";
import reset from "Mixins/reset.js";

export default {
  name: "UpdateFolder",
  components: {
    ChangeDirectory
  },
  props: {
    item: Object,
    fullItems: Array
  },
  mixins: [reset],
  data: () => ({
    folderId: "",
    name: "",
    parentId: "",
    checkboxAvailable: false,
    checkboxBlock: false,
    updateFolderDialog: false,
    valid: false,
    nameRules: [v => v.length > 0 || "Введите имя папки"]
  }),
  methods: {
    updateFolder(folder) {
      this.folderId = folder.id;
      this.name = folder.name;
      this.parentId = folder.parentId;
      this.checkboxAvailable = folder.isAvailable;
      this.checkboxBlock = folder.isBlocked;
      this.updateFolderDialog = true;
    },
    async confirmUpdateFolder() {
      if (this.$refs.form.validate()) {
        this.updateFolderDialog = false;
        let folder = {};
        folder.id = this.folderId;
        folder.parentId = this.parentId;
        folder.name = this.name;
        folder.isAvailable = this.checkboxAvailable;
        await ArticlesService.updateFolder(folder);
        if (this.checkboxBlock) {
          await ArticlesService.updateFolderStatus(folder.id, true);
        }
        this.$emit("update-folder");
      }
      this.cancel();
    },
    changeDirectory(data) {
      this.parentId = data.parentId;
    },
    cancel() {
      this.reset(this, [
        'updateFolderDialog',
        'name',
        'checkboxAvailable',
        'checkboxBlock',
        'valid'
      ]);
    }
  }
};
</script>

