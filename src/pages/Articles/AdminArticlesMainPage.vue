<template>
  <div>
    <v-layout row wrap class="px-5">
      <v-flex xs9 class="left-side pr-2 pl-5 pt-3">
        <v-btn color="white" dark class="primary--text" @click.stop="addFolderDialog = true">
          <v-icon class="mr-3" color="primary">create_new_folder</v-icon>Новая папка
        </v-btn>
        <v-list style="color: #003399">
          <v-list-group v-for="i in items" :key="i.id" :prepend-icon="i.icon">
            <template slot="activator">
              <v-list-tile>
                <v-list-tile-content style="align-items: center; flex-direction: row;">
                  <v-list-tile-title>{{ i.name }}</v-list-tile-title>
                  <v-btn v-if="!i.isBlocked" flat small @click="updateFolder(i)">Редактировать</v-btn>
                  <v-btn
                    v-if="!i.isBlocked"
                    flat
                    small
                    color="red"
                    @click="deleteFolder(i.id)"
                  >Удалить</v-btn>
                  <v-btn
                    v-if="i.isBlocked && !i.isDefault"
                    flat
                    small
                    color="red"
                    @click="unlock(i.id);"
                  >Разблокировать</v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-group v-for="child in i.children" :key="child.id" sub-group class="ml-4">
              <template slot="activator">
                <v-list-tile>
                  <v-list-tile-content style="align-items: center; flex-direction: row;">
                    <v-list-tile-title>{{ child.name }}</v-list-tile-title>
                    <v-btn
                      v-if="!child.isBlocked"
                      flat
                      small
                      @click="updateFolder(child)"
                    >Редактировать</v-btn>
                    <v-btn
                      v-if="!child.isBlocked"
                      flat
                      small
                      color="red"
                      @click="deleteFolder(child.id)"
                      class="mr-5"
                    >Удалить</v-btn>
                    <v-btn
                      v-if="child.isBlocked && !child.isDefault"
                      flat
                      small
                      color="red"
                      @click="unlock(child.id);"
                    >Разблокировать</v-btn>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile
                v-for="grandchild in child.children"
                :key="grandchild.id"
                class="ml-5 pl-5"
              >
                <v-list-tile-content style="align-items: center; flex-direction: row;">
                  <v-list-tile-title>{{ grandchild.name }}</v-list-tile-title>
                  <v-btn
                    v-if="!grandchild.isBlocked"
                    flat
                    small
                    @click="updateFolder(grandchild)"
                  >Редактировать</v-btn>
                  <v-btn
                    v-if="!grandchild.isBlocked"
                    flat
                    small
                    color="red"
                    @click="deleteFolder(grandchild.id)"
                  >Удалить</v-btn>
                  <v-btn
                    v-if="grandchild.isBlocked && !grandchild.isDefault"
                    flat
                    small
                    color="red"
                    @click="unlock(grandchild.id);"
                  >Разблокировать</v-btn>
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
    <v-dialog v-model="addFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Добавить новую папку</v-card-title>
        <v-form ref="form" class="mx-3 pb-3">
          <v-text-field v-model="name" :rules="nameRules" label="Название" required></v-text-field>

          <v-checkbox class="pa-0" v-model="checkboxBlock" label="Заблокирована"></v-checkbox>

          <v-checkbox class="pa-0" v-model="checkboxAvailable" label="Доступна для клиентов"></v-checkbox>

          <v-btn color="red" flat="flat" @click="reset">Отменить</v-btn>

          <v-btn color="primary" flat="flat" @click="addFolder">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updateFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Редактирование папки</v-card-title>
        <v-form ref="form" class="mx-3 pb-3">
          <v-text-field v-model="name" :rules="nameRules" label="Название" required></v-text-field>

          <change-directory
            @changeDirectory="changeDirectory"
            v-bind:items="fullItems"
            v-bind:folderId="folderId"
            v-bind:parentId="parentId"
          />

          <v-checkbox class="pa-0" v-model="checkboxBlock" label="Заблокирована"></v-checkbox>

          <v-checkbox class="pa-0" v-model="checkboxAvailable" label="Доступна для клиентов"></v-checkbox>

          <v-btn color="red" flat="flat" @click="reset">Отменить</v-btn>

          <v-btn color="primary" flat="flat" @click="confirmUpdateFolder">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Вы уверены, что хотите удалить папку?</v-card-title>
        <v-btn color="primary" flat="flat" @click="deleteFolderDialog = false">Отменить</v-btn>
        <v-btn color="red" flat="flat" @click="confirmDeleteFolder(true)">Удалить</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="unlockFolderDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Вы уверены, что хотите разблокировать папку?</v-card-title>
        <v-btn color="primary" flat="flat" @click="unlockFolderDialog = false">Отменить</v-btn>
        <v-btn color="red" flat="flat" @click="confirmUnlock(true)">Разблокировать</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import SideNews from "Components/SideNews";
import ChangeDirectory from "./ChangeDirectory";

export default {
  name: "AdminArticlesMainPage",
  components: {
    SideNews,
    ChangeDirectory
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
    reset() {
      this.addFolderDialog = false;
      this.updateFolderDialog = false;
      this.name = "";
      this.checkboxAvailable = false;
      this.checkboxBlock = false;
      this.valid = false;
    },
    async addFolder() {
      if (this.$refs.form.validate()) {
        await ArticlesService.addFolder(
          0,
          this.name,
          this.checkboxBlock,
          this.checkboxAvailable
        );
        this.reset();
        await this.getItems();
      }
    },
    changeDirectory(data) {
      this.parentId = data.parentId;
    },
    updateFolder(folder) {
      this.folderId = folder.id;
      this.name = folder.name;
      this.parentId = folder.parentID;
      this.checkboxAvailable = folder.isAvailable;
      this.checkboxBlock = folder.isBlocked;
      this.updateFolderDialog = true;
    },
    async confirmUpdateFolder() {
      if (this.$refs.form.validate()) {
        this.updateFolderDialog = false;
        this.isLoaded = false;
        let folder = {};
        folder.id = this.folderId;
        folder.parentId = this.parentId;
        folder.name = this.name;
        folder.isAvailable = this.checkboxAvailable;
        await ArticlesService.updateFolder(folder);
        if (this.checkboxBlock) {
          await ArticlesService.updateFolderStatus(folder.id, true);
        }
        await this.getItems();
      }
      this.reset();
    },
    deleteFolder(folderId) {
      this.folderId = folderId;
      this.deleteFolderDialog = true;
    },
    async confirmDeleteFolder() {
      this.deleteFolderDialog = false;
      this.isLoaded = false;
      await ArticlesService.deleteFolder(this.folderId);
      await this.getItems();
    },
    unlock(folderId) {
      this.unlockFolderDialog = true;
      this.folderId = folderId;
    },
    async confirmUnlock() {
      this.unlockFolderDialog = false;
      this.isLoaded = false;
      await ArticlesService.updateFolderStatus(this.folderId, false);
      await this.getItems();
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