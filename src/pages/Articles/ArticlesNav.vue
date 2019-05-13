<template>
  <v-treeview
    :items="items"
    :active.sync="active"
    v-model="tree"
    activatable
    active-class="grey lighten-2 primary--text"
    hoverable
    open-on-click
    expand-icon="expand_more"
    transition
    max-width="560px"
    @click="getArticle"
  >
    <template v-slot:label="{ item, active }">
      <p style="font-size: 1rem;" class="ma-0" @click="getArticle(item)">
        {{ item.name }}
        </p>
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
    tree: [],
    article: ''
  }),
  methods: {
    async getArticle(item){
      if (item.children == ''){
        this.active.push(item.id);
        this.article = await ArticlesService.getArticle(item.id);
      }
      this.$emit('set-article', {article: this.article})
    }
  },
  async mounted() {
    this.items = await ArticlesService.getItems(this.$route.params.id);
  }
};
</script>

<style scoped>
</style>