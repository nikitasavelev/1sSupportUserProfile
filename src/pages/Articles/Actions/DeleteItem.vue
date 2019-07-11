<template>
  <div>
    <v-btn v-if="!item.isBlocked" flat small color="red" @click="deleteItemDialog = true">Удалить</v-btn>
    <v-dialog v-model="deleteItemDialog" max-width="800">
      <v-card>
        <v-card-title v-if="item.isArticle" class="headline">Вы уверены, что хотите удалить статью?</v-card-title>
        <v-card-title v-else class="headline">Вы уверены, что хотите удалить папку?</v-card-title>
        <v-btn color="primary" flat @click="deleteItemDialog = false">Отменить</v-btn>
        <v-btn color="red" flat @click="confirmDeleteItem">Удалить</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";

export default {
  name: "DeleteItem",
  props: {
    item: Object
  },
  data: () => ({
    id: "",
    deleteItemDialog: false,
    isArticle: false
  }),
  methods: {
    async confirmDeleteItem() {
      this.deleteItemDialog = false;
      if (this.item.isArticle) {
        await ArticlesService.deleteArticle(this.item.id);
      } else {
        await ArticlesService.deleteFolder(this.item.id);
      }
      this.$emit("delete-item");
    }
  }
};
</script>
