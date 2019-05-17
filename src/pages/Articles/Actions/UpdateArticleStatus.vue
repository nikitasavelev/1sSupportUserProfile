<template>
  <div>
    <v-btn
      v-if="i.isBlocked && !i.isDefault && i.isArticle"
      flat
      small
      color="red"
      @click="unlock(i.id);"
    >Разблокировать</v-btn>
    <v-dialog v-model="unlockArticleDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Вы уверены, что хотите разблокировать статью?</v-card-title>
        <v-btn color="primary" flat="flat" @click="unlockArticleDialog = false">Отменить</v-btn>
        <v-btn color="red" flat="flat" @click="confirmUnlock(true)">Разблокировать</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";

export default {
  name: "UpdateArticleStatus",
  props: {
    i: Object
  },
  data: () => ({
    articleId: "",
    unlockArticleDialog: false
  }),
  methods: {
    unlock(articleId) {
      this.unlockArticleDialog = true;
      this.articleId = articleId;
    },
    async confirmUnlock() {
      this.unlockArticleDialog = false;
      await ArticlesService.updateArticleStatus(this.articleId, false);
      this.$emit("update-article-status");
    }
  }
};
</script>
