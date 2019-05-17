<template>
  <div>
    <v-layout row wrap class="px-5">
      <v-flex xs9 class="left-side pr-2 pl-5 pt-3">
        <div style="display: flex; align-items: center; flex-direction: row;" class="mb-3">
          <add-article :items="items" @add-article="getItems"/>
          <add-folder @add-folder="getItems"/>
          <v-btn v-if="!update" color="white" dark class="primary--text" @click="update = !update">
            <v-icon class="mr-3" color="primary">edit</v-icon>Редактировать
          </v-btn>
          <v-btn v-else color="primary" dark @click="update = !update">
            <v-icon class="mr-3" color="white">edit</v-icon>Редактировать
          </v-btn>
        </div>
        <update-list
          v-if="update"
          :items="items"
          :fullItems="fullItems"
          :folderId="folderId"
          :parentId="parentId"
          @update-list="getItems"
        />
        <v-list v-else style="color: #003399; font-size: 2rem">
          <v-list-group v-for="i in items" :key="i.id" :prepend-icon="i.icon">
            <template slot="activator">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ i.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-group v-for="child in i.children" :key="child.id" sub-group class="ml-4">
              <template slot="activator">
                <v-list-tile @click="openFolder(child)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ child.name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
              <div v-if="child.hasArticle == false">
                <v-list-tile
                  v-for="grandchild in child.children"
                  :key="grandchild.id"
                  class="ml-5 pl-5"
                  @click="openFolder(grandchild)"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ grandchild.name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </div>
            </v-list-group>
          </v-list-group>
        </v-list>
        <v-layout v-if="!isLoaded" justify-center mt-5>
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate/>
        </v-layout>
      </v-flex>
      <side-news/>
    </v-layout>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import SideNews from "Components/SideNews";
import AddFolder from "./Actions/AddFolder";
import AddArticle from "./Actions/AddArticle";
import UpdateList from "./Actions/UpdateList";

export default {
  name: "AdminArticlesMainPage",
  components: {
    SideNews,
    AddArticle,
    AddFolder,
    UpdateList
  },
  data: () => ({
    items: [],
    icons: [
      "assignment_turned_in",
      "build",
      "feedback",
      "bookmark",
      "info",
      "description"
    ],
    fullItems: [],
    isLoaded: false,
    addFolderDialog: false,
    updateFolderDialog: false,
    update: false,
    unlockFolderDialog: false,
    deleteFolderDialog: false,
    folderId: "",
    parentId: "",
    name: "",
    checkboxAvailable: false,
    checkboxBlock: false,
    valid: false,
    nameRules: [v => v.length > 0 || "Введите имя папки"]
  }),
  methods: {
    async getItems() {
      this.isLoaded = false;
      this.items = await ArticlesService.getItems(0);
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].icon = this.icons[i];
        if (!this.items[i].isDefault) {
          this.items[i].icon = "folder";
        }
      }
      this.fullItems = this.items.slice();
      this.fullItems.unshift({ id: 0, name: "[Корневой каталог]" });
      this.isLoaded = true;
    },
    openFolder(folder) {
      if (folder.hasArticle)
        this.$router.push({
          name: "ArticlesPage",
          params: { id: folder.parentId }
        });
    }
  },
  async mounted() {
    await this.getItems();
  }
};
</script>

<style scoped>
.left-side {
  border-right: 1px solid gray;
}
</style>