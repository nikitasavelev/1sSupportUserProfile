<template>
  <div>
    <v-btn color="white" dark class="primary--text" @click.stop="addFolderDialog = true">
      <v-icon class="mr-3" color="primary">create_new_folder</v-icon>Новая папка
    </v-btn>
    <v-dialog v-model="addFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Добавить новую папку</v-card-title>
        <v-form ref="form" class="mx-3 pb-3">
          <v-text-field v-model="name" :rules="nameRules" label="Название" required></v-text-field>

          <v-checkbox class="pa-0" v-model="checkboxBlock" label="Заблокирована"></v-checkbox>

          <v-checkbox class="pa-0" v-model="checkboxAvailable" label="Доступна для клиентов"></v-checkbox>

          <v-btn color="red" flat="flat" @click="reset">Отменить</v-btn>

          <v-btn color="primary" flat="flat" @click="addFolder">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from 'Services/ArticlesService.js';

export default {
  name: "AddFolder",
  data: () => ({
    name: '',
    checkboxAvailable: false,
    checkboxBlock: false,
    valid: false,
    nameRules: [v => v.length > 0 || 'Введите имя папки'],
    folderId: '',
    addFolderDialog: false
  }),
  methods: {
    reset() {
      this.addFolderDialog = false;
      this.name = '';
      this.checkboxAvailable = false;
      this.checkboxBlock = false;
      this.valid = false;
    },
    async addFolder() {
      if (this.$refs.form.validate()) {
        await ArticlesService.addFolder(
          0,
          this.name,
          this.checkboxBlock,
          this.checkboxAvailable
        );
        this.reset();
        this.$emit('add-folder')
      }
    }
  }
};
</script>

<style>
</style>
