<template>
  <main>
    <v-layout row wrap class="px-5">
      <v-flex xs9 class="left-side pr-2 pl-5 pt-5">
          <v-list class="list">
            <v-list-group
              v-for="i in items"
              :key="i.id"
              :prepend-icon="i.icon"
            >

              <template slot="activator">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ i.name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

               <v-list-group
                v-for="child in i.children"
                :key="child.id"
                sub-group
                class="ml-4"
              >

                <template slot="activator">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ child.name }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

                    <v-list-tile
                      v-for="grandchild in child.children"
                      :key="grandchild.id"
                      class="ml-5 pl-5"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>{{ grandchild.name }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
              </v-list-group>
            </v-list-group>
          </v-list>
      </v-flex>
      <side-news></side-news>
    </v-layout>
  </main>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import SideNews from "Components/SideNews";

export default {
  name: "ArticlesMainPage",
  components: { SideNews },
  data: () => ({
    tree: [],
    items: [],
    icons: [
      "assignment_turned_in",
      "build",
      "feedback",
      "bookmark",
      "info",
      "description"
    ]
  }),   
  methods: {
    async getItems(){
      this.items = await ArticlesService.getFolders(0);
      for (let i = 0; i < this.items.length; i++){
        this.items[i].icon = this.icons[i]; 
      }
    }
  },
  async mounted(){
    await this.getItems();
  }
};
</script>

<style>
.left-side {
  border-right: 1px solid gray;
}

.list {
  color: #003399 !important;
}
</style>