<template>
  <div>
    <v-btn v-if="!i.isBlocked && i.isArticle" flat small color="red" @click="deleteArticle(i.id)">Удалить</v-btn>
    <v-dialog v-model="deleteArticleDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Вы уверены, что хотите удалить эту статью?</v-card-title>
        <v-btn color="primary" flat="flat" @click="deleteArticleDialog = false">Отменить</v-btn>
        <v-btn color="red" flat="flat" @click="confirmDeleteArticle(true)">Удалить</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";

export default {
  name: "DeleteArticle",
  props: {
    i: Object
  },
  data: () => ({
    articleId: "",
    deleteArticleDialog: false
  }),
  methods: {
    deleteArticle(articleId) {
      this.articleId = articleId;
      this.deleteArticleDialog = true;
    },
    async confirmDeleteArticle() {
      this.deleteArticleDialog = false;
      await ArticlesService.deleteArticle(this.articleId);
      this.$emit("delete-article");
    }
  }
};
</script>
