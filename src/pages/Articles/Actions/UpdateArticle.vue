<template>
  <div>
    <v-btn v-if="!i.isBlocked && i.isArticle" flat small @click="updateArticle(i)">Редактировать</v-btn>
    <v-dialog v-model="updateArticleDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Редактирование статьи</v-card-title>
        <v-form ref="form" class="mx-3 pb-3">
          <v-text-field v-model="name" :rules="nameRules" label="Заголовок" required></v-text-field>

          <change-directory
            @change-directory="changeDirectory"
            :items="items"
            :parentId="folderId"
          />

          <v-checkbox class="pa-0" v-model="checkboxBlock" label="Заблокирована"></v-checkbox>

          <v-checkbox class="pa-0" v-model="checkboxAvailable" label="Доступна для клиентов"></v-checkbox>

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

          <v-btn color="red" flat @click="reset">Отменить</v-btn>

          <v-btn color="primary" flat @click="confirmUpdateArticle">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import ChangeDirectory from "./ChangeDirectory";

export default {
  name: "UpdateArticle",
  components: {
    ChangeDirectory
  },
  props: {
    i: Object,
    items: Array
  },
  data: () => ({
    articleId: "",
    name: "",
    folderId: "",
    file: "",
    fileName: "",
    checkboxAvailable: false,
    checkboxBlock: false,
    updateArticleDialog: false,
    valid: false,
    nameRules: [v => v.length > 0 || "Введите имя папки"]
  }),
  methods: {
    updateArticle(article) {
      this.articleId = article.id;
      this.name = article.name;
      this.folderId = article.parentId;
      this.checkboxAvailable = article.isAvailable;
      this.checkboxBlock = article.isBlocked;
      this.updateArticleDialog = true;
    },
    async confirmUpdateArticle() {
      if (this.$refs.form.validate()) {
        let form = new FormData();
        form.append("Title", this.name);
        form.append("IsAvailable", this.checkboxAvailable);
        form.append("FolderId", this.folderId);
        if (this.file[0] != null) {
          form.append("ArticleFile", this.file[0]);
        }
        await ArticlesService.updateArticle(form, this.articleId);
        if (this.checkboxBlock) {
          await ArticlesService.updateArticleStatus(this.articleId, true);
        }
        this.reset();
        this.$emit("update-article");
      }
      this.errorEmpty = true;
      this.reset();
      return;
    },
    pickFile() {
      this.$refs.inputFile.click();
    },
    onFilePicked() {
      this.file = this.$refs.inputFile.files;
      this.fileName = this.file[0].name;
    },
    changeDirectory(data) {
      this.folderId = data.parentId;
    },
    reset() {
      this.updateArticleDialog = false;
      this.name = "";
      this.checkboxAvailable = false;
      this.checkboxBlock = false;
      this.valid = false;
    }
  }
};
</script>

