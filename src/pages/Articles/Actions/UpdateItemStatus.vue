<template>
  <div>
    <v-btn
      v-if="item.isBlocked && !item.isDefault"
      flat
      small
      color="red"
      @click="unlockItemDialog = true;"
    >Разблокировать</v-btn>
    <v-dialog v-model="unlockItemDialog" max-width="800">
      <v-card>
        <v-card-title v-if="item.isArticle" class="headline">Вы уверены, что хотите разблокировать статью?</v-card-title>
        <v-card-title v-else class="headline">Вы уверены, что хотите разблокировать папку?</v-card-title>        
        <v-btn color="primary" flat @click="unlockItemDialog = false">Отменить</v-btn>
        <v-btn color="red" flat @click="confirmUnlock(true)">Разблокировать</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";

export default {
  name: "UpdateItemStatus",
  props: {
    item: Object
  },
  data: () => ({
    unlockItemDialog: false
  }),
  methods: {
    async confirmUnlock() {
      this.unlockItemDialog = false;
      if (this.item.isArticle) {
        await ArticlesService.updateArticleStatus(this.item.id, false);
      }
      else {
        await ArticlesService.updateFolderStatus(this.item.id, false);
      }
      this.$emit("update-item-status");
    }
  }
};
</script>
