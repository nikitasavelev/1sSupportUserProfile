<template>
  <main>
    <v-layout row wrap class="px-5">
      <v-flex xs9 class="left-side pr-2 pl-5 pt-3">
        <add-folder @add-folder="getItems"/>
        <v-list style="color: #003399">
          <v-list-group v-for="i in items" :key="i.id" :prepend-icon="i.icon">
            <template slot="activator">
              <v-list-tile>
                <v-list-tile-content style="align-items: center; flex-direction: row;">
                  <v-list-tile-title>{{ i.name }}</v-list-tile-title>
                  <update-folder :i="i" :fullItems="fullItems" @update-folder="getItems"/>
                  <delete-folder :i="i" @delete-folder="getItems"/>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-group v-for="child in i.children" :key="child.id" sub-group class="ml-4">
              <template slot="activator">
                <v-list-tile>
                  <v-list-tile-content style="align-items: center; flex-direction: row;">
                    <v-list-tile-title>{{ child.name }}</v-list-tile-title>
                    <update-folder :i="child" :fullItems="fullItems" @update-folder="getItems"/>
                    <delete-folder :i="child" @delete-folder="getItems"/>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile
                v-for="grandchild in child.children"
                :key="grandchild.id"
                class="ml-5 pl-5"
                @click="openFolder(grandchild.id)"
              >
                <v-list-tile-content style="align-items: center; flex-direction: row;">
                  <v-list-tile-title>{{ grandchild.name }}</v-list-tile-title>
                  <update-folder :i="grandchild" :fullItems="fullItems" @update-folder="getItems"/>
                  <delete-folder :i="grandchild" @delete-folder="getItems"/>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list-group>
        </v-list>
        <v-layout v-if="!isLoaded" justify-center mt-5>
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate/>
        </v-layout>
      </v-flex>
      <side-news/>
    </v-layout>
  </main>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import SideNews from "Components/SideNews";
import UpdateFolder from "./Actions/UpdateFolder";
import DeleteFolder from "./Actions/DeleteFolder";
import AddFolder from "./Actions/AddFolder";

export default {
  name: "ArticlesMainPage",
  components: {
    SideNews,
    AddFolder,
    UpdateFolder,
    DeleteFolder
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
      this.items = await ArticlesService.getFolders(0);
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
    openFolder(folderId) {
      this.$router.push({ name: "ArticlesPage", params: { id: folderId } });
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