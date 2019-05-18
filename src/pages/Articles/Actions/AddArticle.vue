<template>
  <div>
    <v-btn color="white" dark class="primary--text" @click.stop="addArticleDialog = true">
      <v-icon class="mr-3" color="primary">note_add</v-icon>Добавить статью
    </v-btn>
    <v-dialog v-model="addArticleDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Добавить статью</v-card-title>
        <v-form ref="form" class="mx-3 pb-3" id="form" onsubmit="addArticle">
          <v-text-field v-model="name" :rules="nameRules" label="Заголовок" required></v-text-field>

          <change-directory @change-directory="changeDirectory" :items="items" :parentId="folderId"/>

          <v-checkbox class="pa-0" v-model="checkboxBlock" label="Заблокирована"></v-checkbox>

          <v-checkbox
            class="pa-0"
            v-model="checkboxAvailable"
            name="IsAvailable"
            label="Доступна для клиентов"
          ></v-checkbox>

          <input
            name="file"
            type="file"
            style="display: none"
            ref="inputFile"
            @change="onFilePicked"
          >

          <v-btn color="white" dark class="primary--text" @click="pickFile">
            <v-icon class="mr-3" color="primary">attach_file</v-icon>Загрузить файл
          </v-btn>
          <p>{{ fileName }}</p>

          <v-btn color="red" flat="flat" @click="reset">Отменить</v-btn>

          <v-btn color="primary" flat="flat" @click="addArticle">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorEmpty" max-width="800">
      <v-card>
        <v-card-title class="headline" color="white">Выберите каталог</v-card-title>
        <v-btn color="primary" flat="flat" @click="errorEmpty=false">Ок</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import ChangeDirectory from "./ChangeDirectory";

export default {
  name: "AddArticle",
  props: {
    items: Array
  },
  components: {
    ChangeDirectory
  },
  data: () => ({
    name: "",
    checkboxAvailable: false,
    checkboxBlock: false,
    valid: false,
    nameRules: [v => v.length > 0 || "Введите заголовок статьи"],
    folderId: "",
    file: "",
    fileName: "",
    addArticleDialog: false,
    errorEmpty: false
  }),
  methods: {
    changeDirectory(data) {
      this.folderId = data.parentId;
    },
    reset() {
      this.addArticleDialog = false;
      this.name = "";
      this.checkboxAvailable = false;
      this.checkboxBlock = false;
      this.valid = false;
      this.file="";
      this.fileName = "";
      this.folderId = "";
    },
    pickFile() {
      this.$refs.inputFile.click();
    },
    onFilePicked() {
      this.file = this.$refs.inputFile.files;
      this.fileName = this.file[0].name;
    },

    async addArticle() {
      if (this.$refs.form.validate() && this.folderId != "") {
        let form = new FormData();
        form.append("Title", this.name);
        form.append("IsBlocked", this.checkboxBlock);
        form.append("IsAvailable", this.checkboxAvailable);
        form.append("FolderId", this.folderId);
        form.append("ArticleFile", this.file[0]);
        await ArticlesService.addArticle(form);
        this.reset();
        this.$emit("add-article");
      }
      else {
        this.errorEmpty = true;
        return;
      }
      this.reset();
    }
  }
};
</script>

<style>
</style>
