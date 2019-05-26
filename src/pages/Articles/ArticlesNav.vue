<template>
  <v-treeview
    :items="items"
    :active.sync="active"
    :open.sync="open"
    v-model="tree"
    activatable
    active-class="grey lighten-2 primary--text"
    hoverable
    open-on-click
    expand-icon="expand_more"
    transition
    @click="getArticle"
  >
    <template v-slot:prepend="{ item }">
      <v-icon v-if="item.icon" class="pa-2">{{ item.icon }}</v-icon>
      <v-icon v-else>{{ item.isArticle ? 'description' : 'folder'}}</v-icon>
    </template>
    <template v-slot:label="{ item, active }">
      <div style="max-width: 430px !important;">
        <p style="font-size: 1rem;" class="ma-0" @click="getArticle(item)">{{ item.name }}</p>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";

export default {
  name: "ArticlesNav",
  data: () => ({
    items: [],
    active: [],
    open: [],
    tree: [],
    article: ""
  }),
  methods: {
    async getArticle(item) {
      if (item.isArticle) {
        this.active.push(item.id);
        this.article = await ArticlesService.getArticle(item.id);
      }
      this.$emit("set-article", { article: this.article });
    }
  },
  async mounted() {
    this.items = await ArticlesService.getItems(this.$route.params.id);
    this.open.push(this.items[0].id);
  }
};
</script>

<style scoped>
</style>