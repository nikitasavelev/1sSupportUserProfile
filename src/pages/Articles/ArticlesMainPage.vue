<template>
  <main>
    <v-layout row wrap class="px-5">
      <v-flex xs9 class="left-side pr-2 pl-5 pt-5">

        <!-- вывод деревом -->
        <v-treeview
          v-model="tree"
          :items="items"
          item-key="name"
          open-on-click
          transition
          class="list"
          >
          <template v-slot:prepend="{ item, open }">
            <v-icon>-</v-icon>
          </template>
        </v-treeview>

        <!--вывод списком -->
          <v-list class="list">
            <v-list-group
              v-for="item in items"
              :key="item.name"
              :prepend-icon="item.icon"
            >

              <template slot="activator">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-group
                v-for="child in item.children"
                :key="child.name"
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
                      :key="grandchild.name"
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
import SideNews from "Components/SideNews";
export default {
  name: "ArticlesMainPage",
  components: { SideNews },
  data: () => ({
    tree: [],
    items: [
      {
        name: "Инструкции по учету в программах 1С",
        icon: "dashboard"
      },
      {
        name: "Инструкции по разработке на 1С",
        icon: "dashboard"
      },
      {
        name: "Консультации по законодательству",
        icon: "dashboard",
        children: [
          {
            name: "Ответы аудиторов"
          },
          {
            name: "Комментарии к законам, письмам и решениям судов",
            children: [
              {
                name: "Комментарии законодательства"
              },
              {
                name: "Разъяснения контролирующих органов"
              },
              {
                name: "Судебная практика"
              }
            ]
          },
          {
            name: "Налоги и взносы"
          },
          {
            name: "Отчетность"
          },
          {
            name: "Кадры, оплата труда и пособия"
          },
          {
            name: "Бюджетный учет"
          }
        ]
      },
      {
        name: "Книги и периодика",
        icon: "dashboard",
        items: [
          {
            name: "Ответы аудиторов"
          },
          {
            name: "Комментарии к законам, письмам и решениям судов",
            items: [
              {
                name: "Комментарии законодательства"
              },
              {
                name: "Разъяснения контролирующих органов"
              },
              {
                name: "Судебная практика"
              }
            ]
          },
          {
            name: "Налоги и взносы"
          },
          {
            name: "Отчетность"
          },
          {
            name: "Кадры, оплата труда и пособия"
          },
          {
            name: "Бюджетный учет"
          }
        ]
      },
      {
        name: "Справочная информация",
        icon: "dashboard"
      },
      {
        name: "База нормативных документов",
        icon: "dashboard"
      }
    ]
  })
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