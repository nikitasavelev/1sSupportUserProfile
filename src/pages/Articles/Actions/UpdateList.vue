<template>
  <div>
    <v-flex xs5 color="lighten-4" ml-2>
      <v-text-field v-model="search" clearable clear-icon="highlight_off" label="Поиск" required></v-text-field>
    </v-flex>
    <v-treeview
      :items="items"
      :search="search"
      :filter="filter"
      v-model="tree"
      expand-icon="expand_more"
      transition
      class="primary--text"
      open-on-click
      hoverable
    >
      <template v-slot:prepend="{ item }">
        <v-icon v-if="item.icon != null" class="pa-2">{{ item.icon }}</v-icon>
        <v-icon v-else> {{ item.isArticle ? 'description' : 'folder'}}</v-icon>
      </template>
      <template v-slot:label="{ item }">
        <span style="font-size: 1rem; padding: 1rem;">{{ item.name }}</span>
      </template>
      <template v-slot:append="{ item }">
        <div style="display: flex; align-items: center; flex-direction: row;">
          <update-folder :i="item" :fullItems="fullItems" @update-folder="getItems"/>
          <delete-folder :i="item" @delete-folder="getItems"/>
          <update-folder-status :i="item" @update-folder-status="getItems"/>
          <update-article-status :i="item" @update-article-status="getItems"/>
          <update-article :i="item" :items="items" @update-article="getItems"/>
          <delete-article :i="item" @delete-article="getItems"/>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script>
import UpdateFolder from "./UpdateFolder";
import DeleteFolder from "./DeleteFolder";
import UpdateFolderStatus from "./UpdateFolderStatus";
import UpdateArticleStatus from "./UpdateArticleStatus";
import UpdateArticle from "./UpdateArticle";
import DeleteArticle from "./DeleteArticle";

export default {
  name: "UpdateList",
  components: {
    UpdateFolder,
    DeleteFolder,
    UpdateFolderStatus,
    UpdateArticleStatus,
    UpdateArticle,
    DeleteArticle
  },
  props: {
    items: Array,
    fullItems: Array,
    folderId: Number,
    parentId: Number
  },
  data: () => ({
    tree: [],
    open: [],
    search: null,
    caseSensitive: false
  }),
  methods: {
    getItems() {
      this.$emit("update-list");
    }
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  }
};
</script>
