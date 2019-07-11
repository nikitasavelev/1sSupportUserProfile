<template>
  <div>
    <v-btn color="white" dark class="primary--text" @click.stop="addFolderDialog = true">
      <v-icon class="mr-3" color="primary">create_new_folder</v-icon>Новая папка
    </v-btn>
    <v-dialog v-model="addFolderDialog" max-width="700">
      <v-card class="pl-1 pt-1">
        <v-card-title class="headline">Добавить новую папку</v-card-title>
        <v-form ref="form" class="mx-3 pb-3">
          <v-text-field v-model="name" :rules="nameRules" label="Название" required/>

          <change-directory
            @change-directory="changeDirectory"
            :items="items"
            :parentId="folderId"
          />

          <v-checkbox class="pa-0" v-model="checkboxBlock" label="Заблокирована"/>

          <v-checkbox class="pa-0" v-model="checkboxAvailable" label="Доступна для клиентов"/>
          <v-layout justify-end>

          <v-btn color="red" flat @click="cancel">Отменить</v-btn>

          <v-btn color="primary" flat @click="addFolder">Сохранить</v-btn>
          </v-layout>
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
  name: "AddFolder",
    props: {
    items: Array
  },
  components:{
    ChangeDirectory
  },
  mixins: [reset],
  data: () => ({
    name: "",
    checkboxAvailable: false,
    checkboxBlock: false,
    valid: false,
    nameRules: [v => v.length > 0 || "Введите имя папки"],
    folderId: "",
    addFolderDialog: false
  }),
  methods: {
    changeDirectory(data) {
      this.folderId = data.parentId;
    },
    cancel() {
      this.reset(this, [
        'addFolderDialog',
        'name',
        'checkboxAvailable',
        'checkboxBlock',
        'valid',
        'folderId'
      ])
    },
    async addFolder() {
      if (this.$refs.form.validate()) {
        await ArticlesService.addFolder(
          this.folderId,
          this.name,
          this.checkboxBlock,
          this.checkboxAvailable
        );
        this.cancel();
        this.$emit("add-folder");
      }
    }
  }
};
</script>

<style>
</style>
