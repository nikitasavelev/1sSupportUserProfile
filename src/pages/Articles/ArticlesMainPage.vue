<template>
  <main>
    <v-layout row wrap class="px-5">
      <v-flex xs9 class="left-side pr-2 pl-5 pt-5">

        <!-- вывод деревом -->
        <!-- <v-treeview
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
        </v-treeview> -->

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
        icon: "assignment_turned_in",
        children: [
            {
              name: "Обзор изменений в программах 1С"
            },
            {
              name: "Ответы специалистов 1С"
            },
            {
              name: "1С:Бухгалтерия 8 в примерах"
            },
            {
              name: "1С:ЗУП 8 в примерах"
            },
            {
              name: "1С:ERP, 1С:КА, 1С:УПП и 1С:УТ в примерах"
            },
            {
              name: "1С:Розница в примерах"
            },
            {
              name: "1С:УНФ 8 в примерах"
            },
            {
              name: "1С:Предприниматель в примерах"
            },
            {
              name: "1С:БГУ 8 в примерах"
            },
            {
              name: "1С:ЗКГУ и 1С:ЗКБУ в примерах"
            },
            {
              name: "Методическая поддержка продуктов 1С"
            },
            {
              name: "Документация для пользователей 1С"
            },
            {
              name: "Руководство по переходу с предыдущих версий"
            }
          ]
      },
      {
        name: "Инструкции по разработке на 1С",
        icon: "build",
        children: [
          {
            name: "Обзор изменений в программах 1С"
          },
          {
            name: "Методические материалы для разработчиков и администраторов 1С"
          },
          {
            name: "Документация для разработчиков и администраторов 1С"
          }
        ]
      },
      {
        name: "Консультации по законодательству",
        icon: "feedback",
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
        icon: "bookmark",
        children: [
          {
            name: "Бухгалтерская периодика"
          },
          {
            name: "Книги для пользователей 1С"
          },
          {
            name: "Книги для разработчиков и администраторов 1С"
          }
        ]
      },
      {
        name: "Справочная информация",
        icon: "info",
        children: [
          {
            name: "Об 1С:ИТС"
          },
          {
            name: "Календари"
          },
          {
            name: "Калькуляторы"
          },
          {
            name: "Справочная информация по налогам и бухучету"
          },
          {
            name: "Справочная информация по кадрам, оплате труда и пособиям"
          },
          {
            name: "Формы учета и отчетности"
          },
          {
            name: "Курсы валют, ставки ЦБ РФ, индексы"
          },
          {
            name: "Полезные ссылки на ресурсы"
          }
        ]
      },
      {
        name: "База нормативных документов",
        icon: "description",
        children: [
          {
            name: "База Гарант"
          },
          {
            name: "База 1С-Элит Строительство"
          },
          {
            name: "Быстрый доступ к важным НПА"
          }
        ]
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