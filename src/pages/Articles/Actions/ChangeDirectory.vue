<template>
  <div>
    <v-btn color="white" dark class="primary--text" @click.stop="changeDirectory">
      <v-icon class="mr-3" color="primary">folder</v-icon>Выбрать размещение
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="headline" color="white">Выберите размещение</v-card-title>

        <v-treeview
          :items="items"
          :active.sync="active"
          :open.sync="open"
          v-model="tree"
          activatable
          active-class="grey lighten-3 primary--text"
          expand-icon="expand_more"
          transition
          class="mx-3"
        >
          <template v-slot:prepend="{ item }">
            <v-icon class="pa-2">{{ item.icon }}</v-icon>
          </template>
          <template v-slot:label="{ item }">{{ item.name }}</template>
        </v-treeview>

        <v-layout justify-end>
          <v-btn color="red" flat class="mb-3" @click="cancel">Отменить</v-btn>

          <v-btn color="primary" flat @click="confirmChangeDirectory">Сохранить</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="error" max-width="800">
      <v-card>
        <v-card-title class="headline" color="white">Нельзя переместить папку в саму себя</v-card-title>
        <v-btn color="primary" flat @click="error=false">Ок</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorEmpty" max-width="800">
      <v-card>
        <v-card-title class="headline" color="white">Выберите каталог</v-card-title>
        <v-btn color="primary" flat @click="errorEmpty=false">Ок</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ChangeDirectory",
  props: {
    items: Array,
    folderId: Number,
    parentId: Number
  },
  data: () => ({
    dialog: false,
    tree: [],
    active: [],
    open: [],
    error: false,
    errorEmpty: false
  }),
  methods: {
    changeDirectory() {
      this.dialog = true;
      this.active.push(this.parentId);
      this.open.push(this.parentId);
    },
    cancel() {
      this.active = [];
      this.dialog = false;
    },
    async confirmChangeDirectory() {
      if (this.active[0] !== this.folderId) { //dont't add folder to itself
        this.$emit("change-directory", {
          parentId: this.active[0]
        });
        this.cancel();
      } else if (!this.active[0]) {
        this.errorEmpty = true;
      } else {
        this.error = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
